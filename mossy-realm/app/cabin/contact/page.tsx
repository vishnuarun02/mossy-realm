'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Panel from '@/components/ui/Panel';
import InsetPanel from '@/components/ui/InsetPanel';
import Button from '@/components/ui/Button';
import TextLink from '@/components/ui/TextLink';
import FormField, { Input, Textarea } from '@/components/ui/FormField';
import { contact } from '@/lib/cabin-content';

/**
 * /cabin/contact - the mailbox.
 *
 * A terminal connection followed by a working form. Validation is
 * real; sending composes a mailto to the cabin's address (no backend
 * required). Success, loading, validation, and error states are all
 * designed states, not accidents.
 * Content and the delivery address live in lib/cabin-content.ts.
 */

type SendState = 'idle' | 'sending' | 'sent';

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // honeypot: humans never fill this
  const [errors, setErrors] = useState<FieldErrors>({});
  const [sendState, setSendState] = useState<SendState>('idle');

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!name.trim()) next.name = 'the cabin needs a name to answer to.';
    if (!email.trim()) {
      next.email = 'no return address, no reply.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      next.email = 'that address looks off. check it once more.';
    }
    if (!message.trim()) next.message = 'an empty letter says very little.';
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot: bots fill hidden fields. Silently drop them.
    if (website) {
      setSendState('sent');
      return;
    }

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSendState('sending');
    const subject = encodeURIComponent(`a letter for the cabin, from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n- ${name.trim()} (${email.trim()})`);

    // Brief composing state, then hand off to the mail client.
    window.setTimeout(() => {
      window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
      setSendState('sent');
    }, 600);
  };

  return (
    <>
      <PageHeader
        breadcrumbs={[{ href: '/cabin', label: 'my cabin' }, { label: 'contact' }]}
        eyebrow="my cabin"
        title="contact"
        deckAccent="~ establish a connection ~"
      />

      <div className="space-y-5">
        {/* Connection fragment */}
        <Panel title="{ connection }" surface="alt">
          <InsetPanel padding="md" className="crt">
            <div className="terminal text-md space-y-1">
              {contact.terminalIntro.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p className="terminal-cursor">&gt; awaiting transmission </p>
            </div>
          </InsetPanel>
        </Panel>

        {/* The mailbox */}
        <Panel title="{ the mailbox }">
          <p className="text-sm text-fg-secondary mb-4">
            {contact.formNote} {contact.availability}
          </p>

          {sendState === 'sent' ? (
            <InsetPanel padding="md">
              <div className="terminal text-md space-y-1">
                <p>&gt; transmission composed.</p>
                <p>&gt; your mail client has the letter. press send there and it reaches the cabin.</p>
                <p className="text-fg-secondary">
                  &gt; nothing opened? write to {contact.email} directly.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={() => setSendState('idle')}
              >
                write another
              </Button>
            </InsetPanel>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              <FormField label="your name" htmlFor="contact-name" error={errors.name}>
                <Input
                  id="contact-name"
                  name="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="wandering soul"
                  autoComplete="name"
                />
              </FormField>

              <FormField
                label="how to reach you"
                htmlFor="contact-email"
                hint="an email address works best."
                error={errors.email}
              >
                <Input
                  id="contact-email"
                  name="contact-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@somewhere.net"
                  autoComplete="email"
                />
              </FormField>

              <FormField label="the letter" htmlFor="contact-message" error={errors.message}>
                <Textarea
                  id="contact-message"
                  name="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="say hi, report a broken page, or recommend a song..."
                />
              </FormField>

              {/* Honeypot: invisible to humans, irresistible to bots */}
              <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
                <label htmlFor="contact-website">website</label>
                <input
                  id="contact-website"
                  name="contact-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Button type="submit" disabled={sendState === 'sending'}>
                  {sendState === 'sending' ? 'composing...' : 'send the letter'}
                </Button>
                {sendState === 'sending' && (
                  <span className="flex items-center gap-2 text-caption text-fg-secondary">
                    <span className="led led-amber led-blink" aria-hidden="true" />
                    composing transmission
                  </span>
                )}
              </div>
            </form>
          )}
        </Panel>

        {/* Other doors */}
        <Panel title="{ other doors }">
          <ul className="space-y-2 text-sm">
            {contact.links.map((link) => (
              <li key={link.href}>
                <TextLink href={link.href} arrow={link.href.startsWith('http')}>
                  {link.label}
                </TextLink>
                <span className="text-fg-secondary"> — {link.note}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
