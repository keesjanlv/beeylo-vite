import type { FC } from 'react'
import { useState } from 'react'
import { Button, Input, Card, CardHeader, CardContent, CardFooter, Stack, Container, Badge, Toast, Modal, NumberedButton, SidebarButton, Typography } from '../components/ui'

export const ComponentDemoPage: FC = () => {
  const [inputValue, setInputValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toastOpen, setToastOpen] = useState(false)
  const [toastVariant, setToastVariant] = useState<'default' | 'success' | 'warning' | 'error' | 'info'>('default')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalSize, setModalSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md')
  const [activeNumberedButton, setActiveNumberedButton] = useState(1)
  const [activeSidebarItem, setActiveSidebarItem] = useState('home')

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    if (!inputValue.trim()) {
      setError('This field is required')
    } else {
      setError('')
      alert(`Submitted: ${inputValue}`)
    }
    
    setLoading(false)
  }

  return (
    <div className="page-container">
      <div className="page-content content-scrollable">
        <div className="layout-scroll">
          <Container size="lg">
            <Stack spacing={8}>
              {/* Header */}
              <Stack spacing={4}>
                <Typography variant="h1" className="text-primary">Component Demo</Typography>
                <Typography variant="body" color="secondary" className="text-lg">
                  Showcase of the new reusable UI component system
                </Typography>
              </Stack>

          {/* Button Variants */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Button Components</h2>
              <p className="text-secondary">Different button variants and sizes</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Button Variants */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Variants</h3>
                  <Stack direction="row" spacing={3} wrap>
                    <Button variant="default">Default</Button>
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                  </Stack>
                </Stack>

                {/* Button Sizes */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Sizes</h3>
                  <Stack direction="row" spacing={3} align="center">
                    <Button size="sm" variant="primary">Small</Button>
                    <Button size="md" variant="primary">Medium</Button>
                    <Button size="lg" variant="primary">Large</Button>
                  </Stack>
                </Stack>

                {/* Button States */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">States</h3>
                  <Stack direction="row" spacing={3}>
                    <Button variant="primary" loading={loading}>
                      {loading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button variant="outline" disabled>
                      Disabled
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Input Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Input Components</h2>
              <p className="text-secondary">Form inputs with different states</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Basic Inputs */}
                <Stack spacing={4}>
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    error={error}
                    helperText="We'll never share your email with anyone else."
                  />
                  
                  <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    size="lg"
                  />
                  
                  <Input
                    label="Disabled Input"
                    placeholder="This input is disabled"
                    disabled
                    value="Disabled value"
                  />
                </Stack>

                {/* Input Sizes */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Input Sizes</h3>
                  <Stack spacing={3}>
                    <Input size="sm" placeholder="Small input" />
                    <Input size="md" placeholder="Medium input (default)" />
                    <Input size="lg" placeholder="Large input" />
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
            <CardFooter>
              <Stack direction="row" spacing={3}>
                <Button 
                  variant="primary" 
                  onClick={handleSubmit}
                  loading={loading}
                >
                  Submit Form
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setInputValue('')
                    setError('')
                  }}
                >
                  Clear
                </Button>
              </Stack>
            </CardFooter>
          </Card>

          {/* Card Variants */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Card Components</h2>
              <p className="text-secondary">Different card styles and layouts</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card variant="default" padding="md">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-2">Default Card</h3>
                    <p className="text-secondary">This is a default card with standard styling.</p>
                  </CardContent>
                </Card>

                <Card variant="outline" padding="md">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-2">Outline Card</h3>
                    <p className="text-secondary">This card has an outline style with transparent background.</p>
                  </CardContent>
                </Card>

                <Card variant="filled" padding="md">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-2">Filled Card</h3>
                    <p className="text-secondary">This card has a filled background style.</p>
                  </CardContent>
                </Card>

                <Card variant="ghost" padding="md">
                  <CardContent>
                    <h3 className="text-lg font-medium mb-2">Ghost Card</h3>
                    <p className="text-secondary">This card has minimal styling with hover effects.</p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Layout Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Layout Components</h2>
              <p className="text-secondary">Stack and Container components for consistent spacing</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Vertical Stack (Column)</h3>
                  <Card variant="outline" padding="md">
                    <Stack spacing={3}>
                      <div className="p-3 bg-primary text-primary-foreground rounded">Item 1</div>
                      <div className="p-3 bg-primary text-primary-foreground rounded">Item 2</div>
                      <div className="p-3 bg-primary text-primary-foreground rounded">Item 3</div>
                    </Stack>
                  </Card>
                </Stack>

                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Horizontal Stack (Row)</h3>
                  <Card variant="outline" padding="md">
                    <Stack direction="row" spacing={3}>
                      <div className="p-3 bg-primary text-primary-foreground rounded">Item 1</div>
                      <div className="p-3 bg-primary text-primary-foreground rounded">Item 2</div>
                      <div className="p-3 bg-primary text-primary-foreground rounded">Item 3</div>
                    </Stack>
                  </Card>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Badge Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Badge Components</h2>
              <p className="text-secondary">Status indicators and labels</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Badge Variants */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Variants</h3>
                  <Stack direction="row" spacing={3} wrap>
                    <Badge variant="default">Default</Badge>
                    <Badge variant="primary">Primary</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                    <Badge variant="error">Error</Badge>
                    <Badge variant="info">Info</Badge>
                  </Stack>
                </Stack>

                {/* Badge Sizes */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Sizes</h3>
                  <Stack direction="row" spacing={3} align="center">
                    <Badge size="sm" variant="primary">Small</Badge>
                    <Badge size="md" variant="primary">Medium</Badge>
                    <Badge size="lg" variant="primary">Large</Badge>
                  </Stack>
                </Stack>

                {/* Badge Usage Examples */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Usage Examples</h3>
                  <Stack spacing={3}>
                    <div className="flex items-center gap-2">
                      <Badge variant="success">New</Badge>
                      <span>Feature just released</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="warning">Beta</Badge>
                      <span>This feature is in beta testing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="error">Deprecated</Badge>
                      <span>This feature will be removed soon</span>
                    </div>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Toast Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Toast Components</h2>
              <p className="text-secondary">Temporary notifications and alerts</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Toast Variants */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Variants</h3>
                  <Stack direction="row" spacing={3} wrap>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setToastVariant('default')
                        setToastOpen(true)
                      }}
                    >
                      Default Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setToastVariant('success')
                        setToastOpen(true)
                      }}
                    >
                      Success Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setToastVariant('warning')
                        setToastOpen(true)
                      }}
                    >
                      Warning Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setToastVariant('error')
                        setToastOpen(true)
                      }}
                    >
                      Error Toast
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setToastVariant('info')
                        setToastOpen(true)
                      }}
                    >
                      Info Toast
                    </Button>
                  </Stack>
                </Stack>

                {/* Toast Preview */}
                <div className="relative h-48 border border-dashed border-border rounded-md p-4 flex items-center justify-center">
                  <p className="text-muted">Click a button above to preview toast</p>
                  
                  {/* Toast will appear here when triggered */}
                  {toastOpen && (
                    <Toast
                      variant={toastVariant}
                      title={`${toastVariant.charAt(0).toUpperCase() + toastVariant.slice(1)} Toast`}
                      open={toastOpen}
                      onClose={() => setToastOpen(false)}
                      duration={5000}
                    >
                      This is a {toastVariant} toast notification example.
                    </Toast>
                  )}
                </div>
              </Stack>
            </CardContent>
          </Card>

          {/* Modal Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Modal Components</h2>
              <p className="text-secondary">Dialog windows and popups</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Modal Sizes */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Sizes</h3>
                  <Stack direction="row" spacing={3} wrap>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setModalSize('sm')
                        setModalOpen(true)
                      }}
                    >
                      Small Modal
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setModalSize('md')
                        setModalOpen(true)
                      }}
                    >
                      Medium Modal
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setModalSize('lg')
                        setModalOpen(true)
                      }}
                    >
                      Large Modal
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setModalSize('xl')
                        setModalOpen(true)
                      }}
                    >
                      Extra Large Modal
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setModalSize('full')
                        setModalOpen(true)
                      }}
                    >
                      Full Screen Modal
                    </Button>
                  </Stack>
                </Stack>

                {/* Modal Preview */}
                <div className="border border-dashed border-border rounded-md p-4 flex items-center justify-center h-32">
                  <p className="text-muted">Click a button above to open a modal</p>
                </div>

                {/* Modal will appear when triggered */}
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  title={`${modalSize.toUpperCase()} Modal Example`}
                  size={modalSize}
                  footer={
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setModalOpen(false)}>
                        Cancel
                      </Button>
                      <Button variant="primary" onClick={() => setModalOpen(false)}>
                        Confirm
                      </Button>
                    </div>
                  }
                >
                  <div className="py-4">
                    <p className="mb-4">This is a {modalSize} modal dialog example.</p>
                    <p>Modals are useful for:</p>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>Confirming user actions</li>
                      <li>Displaying important information</li>
                      <li>Collecting user input in forms</li>
                      <li>Showing detailed content without navigating away</li>
                    </ul>
                  </div>
                </Modal>
              </Stack>
            </CardContent>
          </Card>

          {/* NumberedButton Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Numbered Button Components</h2>
              <p className="text-secondary">Navigation buttons with numbers</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Basic Usage */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Basic Usage</h3>
                  <Stack direction="row" spacing={3}>
                    <NumberedButton 
                      number={1} 
                      active={activeNumberedButton === 1} 
                      onClick={() => setActiveNumberedButton(1)}
                    />
                    <NumberedButton 
                      number={2} 
                      active={activeNumberedButton === 2} 
                      onClick={() => setActiveNumberedButton(2)}
                    />
                    <NumberedButton 
                      number={3} 
                      active={activeNumberedButton === 3} 
                      onClick={() => setActiveNumberedButton(3)}
                    />
                  </Stack>
                </Stack>

                {/* Feature Navigation Example */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Feature Navigation</h3>
                  <div className="feature-navigation">
                    {[1, 2, 3, 4].map((num) => (
                      <NumberedButton 
                        key={num}
                        number={num} 
                        active={activeNumberedButton === num} 
                        onClick={() => setActiveNumberedButton(num)}
                      />
                    ))}
                  </div>
                  <p className="text-muted">The feature navigation layout automatically centers on mobile and left-aligns on desktop.</p>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* SidebarButton Components */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Sidebar Button Components</h2>
              <p className="text-secondary">Navigation buttons for sidebar menus</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                {/* Basic Usage */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Basic Usage</h3>
                  <div style={{ maxWidth: '280px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2)' }}>
                    <SidebarButton 
                      active={activeSidebarItem === 'home'} 
                      onClick={() => setActiveSidebarItem('home')}
                    >
                      Home
                    </SidebarButton>
                    <SidebarButton 
                      active={activeSidebarItem === 'giveaway'} 
                      onClick={() => setActiveSidebarItem('giveaway')}
                    >
                      Giveaway
                    </SidebarButton>
                    <SidebarButton 
                      active={activeSidebarItem === 'about'} 
                      onClick={() => setActiveSidebarItem('about')}
                    >
                      About us
                    </SidebarButton>
                    <SidebarButton 
                      active={activeSidebarItem === 'faq'} 
                      onClick={() => setActiveSidebarItem('faq')}
                    >
                      FAQ
                    </SidebarButton>
                  </div>
                </Stack>

                {/* With Icons */}
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">With Icons</h3>
                  <div style={{ maxWidth: '280px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-2)' }}>
                    <SidebarButton 
                      active={activeSidebarItem === 'home'} 
                      onClick={() => setActiveSidebarItem('home')}
                      icon={<span>🏠</span>}
                    >
                      Home
                    </SidebarButton>
                    <SidebarButton 
                      active={activeSidebarItem === 'giveaway'} 
                      onClick={() => setActiveSidebarItem('giveaway')}
                      icon={<span>🎁</span>}
                    >
                      Giveaway
                    </SidebarButton>
                    <SidebarButton 
                      active={activeSidebarItem === 'about'} 
                      onClick={() => setActiveSidebarItem('about')}
                      icon={<span>ℹ️</span>}
                    >
                      About us
                    </SidebarButton>
                    <SidebarButton 
                      active={activeSidebarItem === 'faq'} 
                      onClick={() => setActiveSidebarItem('faq')}
                      icon={<span>❓</span>}
                    >
                      FAQ
                    </SidebarButton>
                  </div>
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Typography & Utilities */}
          <Card>
            <CardHeader>
              <h2 className="text-2xl font-semibold">Typography & Utilities</h2>
              <p className="text-secondary">Consistent typography and utility classes</p>
            </CardHeader>
            <CardContent>
              <Stack spacing={6}>
                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Text Sizes</h3>
                  <Stack spacing={2}>
                    <p className="text-xs">Extra small text (12px)</p>
                    <p className="text-sm">Small text (14px)</p>
                    <p className="text-base">Base text (16px)</p>
                    <p className="text-lg">Large text (18px)</p>
                    <p className="text-xl">Extra large text (20px)</p>
                    <p className="text-2xl">2XL text (24px)</p>
                  </Stack>
                </Stack>

                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Text Colors</h3>
                  <Stack spacing={2}>
                    <p className="text-primary">Primary text color</p>
                    <p className="text-secondary">Secondary text color</p>
                    <p className="text-tertiary">Tertiary text color</p>
                    <p className="text-muted">Muted text color</p>
                  </Stack>
                </Stack>

                <Stack spacing={3}>
                  <h3 className="text-lg font-medium">Font Weights</h3>
                  <Stack spacing={2}>
                    <p className="font-normal">Normal weight (400)</p>
                    <p className="font-medium">Medium weight (500)</p>
                    <p className="font-semibold">Semibold weight (600)</p>
                    <p className="font-bold">Bold weight (700)</p>
                  </Stack>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
            </Stack>
          </Container>
        </div>
      </div>
    </div>
  )
}

export default ComponentDemoPage
