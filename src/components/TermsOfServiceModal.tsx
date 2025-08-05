import type { FC } from 'react'
import { Modal } from './Modal'

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TermsOfServiceModal: FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Terms of Service" modalClassName="terms-modal">
      <div className="modal-text-content">
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using Beeylo's services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service. These terms apply to all users of the Beeylo platform.
        </p>

        <h3>2. Description of Service</h3>
        <p>
          Beeylo is an email management platform that helps users organize, filter, and manage their email communications. Our service connects to your existing email accounts to provide intelligent filtering, categorization, and organization features to reduce email clutter and improve productivity.
        </p>

        <h3>3. User Accounts and Responsibilities</h3>
        <p>
          You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate information when creating your account and keep it updated. You are responsible for ensuring you have the right to connect email accounts to our service.
        </p>

        <h3>4. Email Access and Permissions</h3>
        <p>
          By using Beeylo, you grant us permission to access your email accounts to provide our services. We will only access emails necessary for our service functionality. You can revoke these permissions at any time by disconnecting your email accounts or deleting your Beeylo account.
        </p>

        <h3>5. Prohibited Uses</h3>
        <p>
          You may not use Beeylo for any illegal activities, to violate others' privacy, to send spam or malicious content, to attempt to gain unauthorized access to our systems, or to interfere with the proper functioning of our service. We reserve the right to suspend or terminate accounts that violate these terms.
        </p>

        <h3>6. Intellectual Property</h3>
        <p>
          Beeylo and its original content, features, and functionality are owned by Beeylo and are protected by international copyright, trademark, and other intellectual property laws. You retain ownership of your email content, but grant us a limited license to process it for service provision.
        </p>

        <h3>7. Service Availability and Modifications</h3>
        <p>
          We strive to maintain high service availability but cannot guarantee uninterrupted access. We may modify, suspend, or discontinue any part of our service at any time. We will provide reasonable notice for significant changes that affect your use of the service.
        </p>

        <h3>8. Limitation of Liability</h3>
        <p>
          Beeylo is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, special, or consequential damages arising from your use of our service. Our total liability is limited to the amount you paid for our service in the past 12 months.
        </p>

        <h3>9. Termination</h3>
        <p>
          You may terminate your account at any time by contacting us or using account deletion features. We may terminate or suspend your account for violations of these terms. Upon termination, your right to use the service ceases, and we may delete your account data according to our data retention policy.
        </p>

        <h3>10. Governing Law and Disputes</h3>
        <p>
          These terms are governed by the laws of the jurisdiction where Beeylo operates. Any disputes will be resolved through binding arbitration or in the courts of that jurisdiction. You waive any right to participate in class action lawsuits against Beeylo.
        </p>

        <h3>11. Changes to Terms</h3>
        <p>
          We may update these Terms of Service from time to time. We will notify you of material changes by posting the updated terms on our website and updating the effective date. Your continued use of our service after changes constitutes acceptance of the new terms.
        </p>

        <h3>12. Contact Information</h3>
        <p>
          If you have any questions about these Terms of Service, please contact us at legal@beeylo.com or visit www.beeylo.com for more information. For technical support, please use our support channels available on our website.
        </p>
      </div>
    </Modal>
  )
}