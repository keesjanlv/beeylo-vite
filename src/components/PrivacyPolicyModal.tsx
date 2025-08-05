import type { FC } from 'react'
import { Modal } from './Modal'

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export const PrivacyPolicyModal: FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Privacy Policy" modalClassName="terms-modal">
      <div className="modal-text-content">
        <p><strong>Effective Date:</strong> January 1, 2025</p>
        
        <h3>1. Information We Collect</h3>
        <p>
          When you use Beeylo, we collect your email address to provide our email management services. We may also collect usage data such as how you interact with our platform, device information, and IP addresses to improve our service and ensure security.
        </p>

        <h3>2. How We Use Your Information</h3>
        <p>
          We use your email address to provide our core service of filtering and organizing your emails. Usage data helps us improve our algorithms, enhance user experience, and maintain platform security. We do not sell your personal information to third parties.
        </p>

        <h3>3. Information Sharing and Disclosure</h3>
        <p>
          We do not share your personal information except in the following circumstances: (a) with your explicit consent, (b) to comply with legal obligations, (c) to protect our rights and safety, or (d) with trusted service providers who assist in operating our platform under strict confidentiality agreements.
        </p>

        <h3>4. Data Security</h3>
        <p>
          We implement industry-standard security measures to protect your data, including encryption, secure servers, and regular security audits. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
        </p>

        <h3>5. Email Access and Processing</h3>
        <p>
          To provide our email filtering service, we need access to your email account. We only access emails necessary to provide our service and use automated systems to categorize and filter content. We do not read your emails manually unless required for technical support with your explicit permission.
        </p>

        <h3>6. Third-Party Services</h3>
        <p>
          We may integrate with email providers (Gmail, Outlook, etc.) and other services to enhance functionality. These integrations are governed by their respective privacy policies. We carefully select partners who maintain high privacy and security standards.
        </p>

        <h3>7. Data Retention</h3>
        <p>
          We retain your personal information only as long as necessary to provide our services or as required by law. You can request deletion of your account and associated data at any time, subject to legal retention requirements.
        </p>

        <h3>8. Your Rights and Choices</h3>
        <p>
          You have the right to access, update, or delete your personal information. You can also opt out of certain communications and request a copy of your data. To exercise these rights, please contact us using the information provided below.
        </p>

        <h3>9. Children's Privacy</h3>
        <p>
          Beeylo is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it promptly.
        </p>

        <h3>10. International Data Transfers</h3>
        <p>
          Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable privacy laws.
        </p>

        <h3>11. Changes to This Privacy Policy</h3>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the effective date. Your continued use of our service constitutes acceptance of the updated policy.
        </p>

        <h3>12. Contact Us</h3>
        <p>
          If you have any questions about this Privacy Policy or our privacy practices, please contact us at privacy@beeylo.com or visit www.beeylo.com for more information.
        </p>
      </div>
    </Modal>
  )
}