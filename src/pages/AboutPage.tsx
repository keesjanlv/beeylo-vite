import type { FC } from 'react'
import { Card, CardContent, Container, Stack, Typography } from '../components/ui'
import { PageBadge } from '../components'

export const AboutPage: FC = () => (
  <div className="page-container smart-container">
    <div className="page-content layout-fit about-adaptive">
      <div className="content-center-scroll adaptive-content">
        <Container size="lg">
          <Stack spacing={8}>
            <div className="about-header-group">
              <PageBadge>Our Story</PageBadge>
              <Typography variant="h2" className="text-center">
                We're not just launching an inbox. We're starting a shift.
              </Typography>
            </div>

            <div className="grid desktop:grid-cols-2 gap-8 my-8">
              <div>
                <Typography variant="body" color="secondary" className="text-center">
                  For too long, companies have controlled how they talk to us. Flooding our inboxes with spam, ads, and useless updates.
                </Typography>
              </div>
              <div>
                <Typography variant="body" color="secondary" className="text-center">
                  Beeylo is the world's first inbox built for people, not brands. It only shows what actually matters. And we're building it with the people. For the people.
                </Typography>
              </div>
            </div>

            <Card className="quote-card">
              <CardContent>
                <Stack spacing={4} className="text-center">
                  <Typography variant="h3" className="quote-text text-center">
                    “Because inbox noise was never your choice”
                  </Typography>
                  <Typography variant="body" color="secondary" className="quote-attribution text-center">
                    — Team Beeylo
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Container>
      </div>
    </div>
  </div>
)