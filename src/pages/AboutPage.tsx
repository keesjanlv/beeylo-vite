import type { FC } from 'react'
import { Card, CardContent, Stack, Typography } from '../components/ui'
import { PageBadge } from '../components'

export const AboutPage: FC = () => (
  <div className="no-scroll-page">
    <div className="no-scroll-content">
      <div className="no-scroll-stack">
        <div className="no-scroll-section">
          <div className="about-header-group">
            <PageBadge>Our Story</PageBadge>
            <Typography variant="h2" className="no-scroll-title text-center">
              We're not just launching an inbox. We're starting a shift.
            </Typography>
          </div>
        </div>

        <div className="no-scroll-section">
          <Typography variant="body" color="secondary" className="no-scroll-body text-center">
            For too long, companies have controlled how they talk to us. Flooding our inboxes with spam, ads, and useless updates.
            <br /><br />
            Beeylo is the world's first inbox built for people, not brands. It only shows what actually matters. And we're building it with the people. For the people.
          </Typography>
        </div>

        <div className="no-scroll-section">
          <Card className="no-scroll-card">
            <CardContent>
              <Stack spacing={4} className="text-center">
                <Typography variant="h3" className="quote-text text-center">
                  "Because inbox noise was never your choice"
                </Typography>
                <Typography variant="body" color="secondary" className="quote-attribution text-center">
                  — Team Beeylo
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </div>
)