import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: `"パーソナルジム" <${process.env.SMTP_USER}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    console.log('Email sent:', info.messageId)
    return { success: true, messageId: info.messageId }
  } catch (error) {
    console.error('Email sending failed:', error)
    return { success: false, error }
  }
}

export function generateEmailTemplate(content: string, unsubscribeUrl?: string) {
  return `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>パーソナルジム メールマガジン</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        .container {
          background-color: white;
          border-radius: 10px;
          padding: 40px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 20px;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #3b82f6;
          margin-bottom: 10px;
        }
        .content {
          margin-bottom: 30px;
        }
        .footer {
          border-top: 1px solid #e5e7eb;
          padding-top: 20px;
          margin-top: 30px;
          text-align: center;
          font-size: 14px;
          color: #6b7280;
        }
        .unsubscribe {
          margin-top: 15px;
        }
        .unsubscribe a {
          color: #6b7280;
          text-decoration: none;
        }
        .unsubscribe a:hover {
          text-decoration: underline;
        }
        h1, h2, h3 {
          color: #1f2937;
        }
        a {
          color: #3b82f6;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">PersonalGym</div>
          <p>あなたの理想の体を実現するパーソナルジム</p>
        </div>
        
        <div class="content">
          ${content}
        </div>
        
        <div class="footer">
          <p>このメールは、パーソナルジムのメールマガジンにご登録いただいた方にお送りしています。</p>
          <p>〒100-0001 東京都千代田区千代田1-1-1<br>
          TEL: 03-1234-5678 | Email: info@personalgym.com</p>
          ${unsubscribeUrl ? `
          <div class="unsubscribe">
            <a href="${unsubscribeUrl}">配信停止はこちら</a>
          </div>
          ` : ''}
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendNewsletterCampaign(
  campaignId: string,
  subscribers: string[]
) {
  try {
    // This would be implemented with a queue system in production
    // For now, we'll send emails in batches to avoid overwhelming the SMTP server
    
    const batchSize = 10
    const batches = []
    
    for (let i = 0; i < subscribers.length; i += batchSize) {
      batches.push(subscribers.slice(i, i + batchSize))
    }
    
    const results = []
    
    for (const batch of batches) {
      const batchResults = await Promise.allSettled(
        batch.map(async (email) => {
          const unsubscribeUrl = `${process.env.NEXTAUTH_URL}/newsletter/unsubscribe?email=${encodeURIComponent(email)}`
          
          // Get campaign content - this would fetch from database
          const campaign = {
            subject: 'パーソナルジム メールマガジン',
            content: '<h2>今週のフィットネス情報</h2><p>お疲れ様です！今週のトレーニングTipsをお送りします。</p>'
          }
          
          return sendEmail({
            to: email,
            subject: campaign.subject,
            html: generateEmailTemplate(campaign.content, unsubscribeUrl)
          })
        })
      )
      
      results.push(...batchResults)
      
      // Add delay between batches to respect rate limits
      if (batches.indexOf(batch) < batches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    
    const successful = results.filter(r => r.status === 'fulfilled').length
    const failed = results.filter(r => r.status === 'rejected').length
    
    return {
      success: true,
      sent: successful,
      failed: failed,
      total: subscribers.length
    }
  } catch (error) {
    console.error('Newsletter campaign failed:', error)
    return {
      success: false,
      error: error
    }
  }
}