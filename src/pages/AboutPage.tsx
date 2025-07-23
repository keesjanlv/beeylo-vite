import type { FC } from 'react'
import { Container, Stack } from '../components/ui'
import { PageBadge } from '../components'

export const AboutPage: FC = () => (
  <div className="page-content">
    <Container size="lg">
      <Stack spacing={8}>
        {/* Page Badge */}
        <PageBadge>Our Story</PageBadge>
        
        {/* First Section */}
        <Stack spacing={4}>
          <h2 className="text-4xl font-bold">
            We're not just launching an inbox.<br />
            We're starting a shift.
          </h2>
          <p className="text-lg text-secondary">
            For too long, companies have controlled how they talk to us. Flooding our inboxes with spam, ads, and useless updates.
          </p>
        </Stack>

        {/* Second Section */}
        <Stack spacing={4}>
          <h3 className="text-3xl font-bold">
            We're two friends who decided to fix that.
          </h3>
          <p className="text-lg text-secondary">
            Beeylo is the world's first inbox built for people, not brands. It only shows what actually matters. And we're building it with the people. For the people.
          </p>
        </Stack>

        {/* Final Statement */}
        <div className="text-center">
          <p className="text-xl font-medium text-secondary italic">
            Because inbox noise was never your choice
          </p>
        </div>
      </Stack>
    </Container>
  </div>
)