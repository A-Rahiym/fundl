import { Button } from '../../../components/Button'
import { Panel } from '../../../components/Panel'
import { StatusStamp } from '../../../components/StatusStamp'
import { Icon } from '../../../components/icons'
import { Field, TextInput, Textarea, CheckpointRow } from './form'

/**
 * Design-system reference panel. Demo content stays literal English —
 * it exists to exercise every primitive, not as product copy.
 */
export function SystemToolkit() {
  return (
    <Panel tilt="tilt-n5" className="p-6 text-left tablet:p-8">
      <h3 className="font-display text-lg">The toolkit</h3>
      <div className="mt-1 font-hand text-[18px] text-ink/60">buttons · stamps · forms</div>

      <h4 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink/50">Buttons</h4>
      <div className="mt-3 flex flex-wrap gap-3">
        <Button variant="primary">Post a job</Button>
        <Button variant="blue">Primary blue</Button>
        <Button variant="green">Accept offer</Button>
        <Button variant="red">Decline</Button>
        <Button variant="outline">Browse fundis</Button>
        <Button variant="ghost">Save draft</Button>
        <Button variant="primary" size="sm">Small</Button>
        <Button disabled>Disabled</Button>
      </div>

      <h4 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink/50">Stamps</h4>
      <div className="mt-3 flex flex-wrap gap-2">
        <StatusStamp tone="open">Open</StatusStamp>
        <StatusStamp tone="in-progress">In progress</StatusStamp>
        <StatusStamp tone="completed">Completed</StatusStamp>
        <StatusStamp tone="cancelled">Cancelled</StatusStamp>
        <StatusStamp tone="available" icon={<Icon name="check" size={12} />}>Available now</StatusStamp>
        <StatusStamp tone="unavailable">Booked</StatusStamp>
      </div>

      <h4 className="mt-6 text-xs font-extrabold uppercase tracking-wider text-ink/50">Forms</h4>
      <div className="mt-3 grid gap-4 tablet:grid-cols-2">
        <Field label="Job title" htmlFor="demo-title">
          <TextInput id="demo-title" placeholder="e.g. Fix leaking tap" />
        </Field>
        <Field label="Budget" htmlFor="demo-budget">
          <TextInput id="demo-budget" placeholder="₦ 5,000" />
        </Field>
        <Field label="Details" htmlFor="demo-details" className="tablet:col-span-2">
          <Textarea id="demo-details" placeholder="Describe the job — you can write this in any language." />
        </Field>
      </div>
      <div className="mt-6">
        <CheckpointRow steps={['Details', 'Budget', 'Confirm']} current={1} />
      </div>
    </Panel>
  )
}
