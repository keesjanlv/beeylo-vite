import type { FC } from 'react'
import { Card, CardContent, Container, Stack, Typography } from '../components/ui'
import { PageBadge } from '../components'

export const AboutPage: FC = () => (
  <div className="page-container">
    <div className="page-content content-scrollable">
      <div className="content-center-scroll">
        <Container size="lg">
          <Stack spacing={8}>
            <div className="about-header-group">
              <PageBadge>Our Story</PageBadge>
              <Typography variant="h2" className="text-center">
                We're not just launching an inbox. We're starting a shift.
              </Typography>
            </div>

            <div className="grid desktop:grid-cols-2 gap-8">
              <Card>
                <CardContent>
                  <Stack spacing={4}>
                    <Typography variant="h3">Why?</Typography>
                    <Typography variant="body" color="secondary">
                      For too long, companies have controlled how they talk to us. Flooding our inboxes with spam, ads, and useless updates.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Stack spacing={4}>
                    <Typography variant="h3">How?</Typography>
                    <Typography variant="body" color="secondary">
                      Beeylo is the world's first inbox built for people, not brands. It only shows what actually matters. And we're building it with the people. For the people.
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </div>

            <div className="text-center py-4">
              <Typography variant="body" weight="medium" className="text-center text-xl" style={{ color: '#FBBF16' }}>
                Because inbox noise was never your choice
              </Typography>
            </div>
          </Stack>
        </Container>
      </div>
    </div>
  </div>
)