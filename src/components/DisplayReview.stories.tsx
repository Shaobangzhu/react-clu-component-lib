import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, IconButton, Card, Badge, StatusIndicator, StatCard, Alert, Skeleton, EmptyState } from '../index';
function Review() {
    return <div style={{ display: 'grid', gap: 'var(--clu-space-4)', padding: 'var(--clu-space-6)', maxWidth: '60rem', background: 'var(--clu-surface-canvas)', color: 'var(--clu-text)', fontFamily: 'var(--clu-font-sans)' }}>
 <h1>CLU display primitives</h1>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--clu-space-3)' }}><Button>Primary action</Button><Button variant="secondary">Secondary</Button><Button variant="quiet">Quiet</Button><Button variant="danger">Danger</Button><IconButton aria-label="Add item">+</IconButton><Button loading>Saving changes</Button><Button disabled>Disabled</Button></div>
 <Card header="Generic working surface" footer="No domain behavior">Long descriptions remain readable on compact screens without implying a domain-specific layout.</Card>
 <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--clu-space-2)' }}><Badge>Neutral label</Badge>{(['operational', 'degraded', 'unavailable', 'not_yet_verified', 'not_configured'] as const).map(status => <StatusIndicator key={status} status={status}/>)}</div>
 <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 12rem), 1fr))', gap: 'var(--clu-space-3)' }}><StatCard label="Observed zero" value={0}/><StatCard label="Unavailable" value={null}/><StatCard label="Unobserved" value={undefined}/></div>
 <Alert tone="warning">Review needed. This static message does not announce itself.</Alert>
 <Card header="Loading specimen"><Skeleton /><p>The consuming region owns its loading announcement.</p></Card>
 <EmptyState title="No observations yet" description="Change the selection or add a record." action={<Button>Add record</Button>}/>
 </div>;
}
const meta = { title: 'Display/Review matrix', component: Review, parameters: { layout: 'fullscreen' } } satisfies Meta<typeof Review>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Light: Story = { parameters: { cluTheme: 'light' } };
export const Dark: Story = { parameters: { cluTheme: 'dark' } };
