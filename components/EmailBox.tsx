import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import ReactGA from 'react-ga4';
import { Button } from '@/components/ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';

export default function EmailBox() {
  const [loading, setLoading] = useState(false);

  // EmailJS public browser identifiers; the recipient is fixed in the template.
  const serviceID = 'service_h0ee3dl';
  const templateID = 'template_58dt1zc';
  const publicKey = 'U1nZSdwZnpvjua1Xu';
  const sendingRef = useRef(false);
  const subjectRef = useRef<HTMLTextAreaElement>(null);
  const senderNameRef = useRef<HTMLInputElement>(null);
  const socialIdRef = useRef<HTMLInputElement>(null);

  function recentEmailTimestamps(): number[] {
    try {
      const stored = JSON.parse(
        localStorage.getItem('emailTimestamps') || '[]'
      );
      if (!Array.isArray(stored)) return [];
      return stored.filter(
        timestamp =>
          typeof timestamp === 'number' &&
          Date.now() - timestamp < 24 * 60 * 60 * 1000
      );
    } catch {
      return [];
    }
  }

  function canSendEmail(): boolean {
    return recentEmailTimestamps().length < 2;
  }

  function getRemainingTime(): string {
    const timestamps = recentEmailTimestamps();
    if (!timestamps.length) return '';
    const remaining = Math.max(
      0,
      24 * 60 * 60 * 1000 - (Date.now() - Math.min(...timestamps))
    );
    return `${Math.floor(remaining / 3600000)}h ${Math.floor((remaining % 3600000) / 60000)}m`;
  }

  function getEmailCount(): number {
    return recentEmailTimestamps().length;
  }

  function sendEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sendingRef.current) return;

    // Check if user can send email
    if (!canSendEmail()) {
      const remainingTime = getRemainingTime();
      const emailCount = getEmailCount();
      toast.warning('Rate limit exceeded', {
        description: `You've sent ${emailCount}/2 emails in the last 24 hours. Next email available in ${remainingTime}.`,
      });
      return;
    }

    const message = subjectRef.current?.value.trim();
    const senderEmail = senderNameRef.current?.value.trim();
    const socialId = socialIdRef.current?.value.trim();
    if (!message || !senderEmail || !event.currentTarget.reportValidity())
      return;
    sendingRef.current = true;
    setLoading(true);
    const templateParams = {
      from_name: senderEmail,
      reply_to: senderEmail,
      subject: 'New message from jeevanu.com',
      message,
      social_id: socialId || 'Not provided',
      site_url: 'https://jeevanu.com/',
    };
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        ReactGA.event({
          category: 'Button.Click',
          action: 'Emailjs Trigger',
        });
        if (subjectRef.current) subjectRef.current.value = '';
        if (socialIdRef.current) socialIdRef.current.value = '';

        if (senderNameRef.current) senderNameRef.current.value = '';
        try {
          localStorage.setItem(
            'emailTimestamps',
            JSON.stringify([...recentEmailTimestamps(), Date.now()])
          );
        } catch {
          // A storage restriction must not turn a successful send into an error.
        }

        toast.success('Email sent successfully!', {
          description: `Thanks for reaching out! I'll get back to you soon :)`,
        });
      })
      .catch(() => {
        toast.error('Failed to send email', {
          description: 'Something went wrong. Please try again later.',
        });
      })
      .finally(() => {
        sendingRef.current = false;
        setLoading(false);
      });
  }

  return (
    <form className="grid grid-cols-1 gap-y-4" onSubmit={sendEmail}>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-sender-name">Email Address</Label>
        <Input
          id="contact-form-sender-name"
          type="email"
          name="email"
          maxLength={254}
          ref={senderNameRef}
          data-cursor-focusable="true"
          placeholder="you@example.com"
          required
        ></Input>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form-social-id">Social Media (Optional)</Label>
        <Input
          id="contact-form-social-id"
          type="text"
          name="social_id"
          maxLength={500}
          ref={socialIdRef}
          data-cursor-focusable="true"
          placeholder="@yourhandle or linkedin.com/in/yourprofile"
        ></Input>
      </div>
      <div className="grid w-full items-center gap-1.5">
        <Label htmlFor="contact-form">Message</Label>
        <Textarea
          id="contact-form"
          data-cursor-focusable="true"
          ref={subjectRef}
          rows={5}
          name="message"
          maxLength={5000}
          placeholder="Hey Jeevan, This is an awesome website!"
          required
        ></Textarea>
      </div>
      <Button disabled={loading} type="submit">
        {loading ? 'Sending…' : 'Send me an email!'}
      </Button>
    </form>
  );
}
