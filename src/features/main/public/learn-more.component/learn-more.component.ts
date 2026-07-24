import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

interface Step {
  readonly title: string;
  readonly body: string;
}

interface Benefit {
  readonly icon: string;
  readonly title: string;
  readonly body: string;
}

interface Faq {
  readonly question: string;
  readonly answer: string;
}

@Component({
  selector: 'app-learn-more',
  imports: [RouterLink, NgbAccordionModule],
  templateUrl: './learn-more.component.html',
  styleUrl: './learn-more.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LearnMoreComponent {
  protected readonly currentYear = new Date().getFullYear();

  protected readonly steps: readonly Step[] = [
    {
      title: 'Online enrollment',
      body: 'Parents submit student information digitally. Registrars review and approve. All documents are stored in one secure location.',
    },
    {
      title: 'Centralized records',
      body: 'Student profiles hold contact details, medical records, academic history, and emergency contacts, available to authorized staff instantly.',
    },
    {
      title: 'Teacher grade entry',
      body: 'Teachers log grades by quarter. The system computes weighted averages and descriptors automatically as scores are entered.',
    },
    {
      title: 'Report cards and insights',
      body: 'Generate report cards in one step. Parents and students view grades immediately, and administrators see performance across the school.',
    },
  ];

  protected readonly benefits: readonly Benefit[] = [
    {
      icon: 'bi-clock',
      title: 'Save time',
      body: 'Replace paper forms and manual encoding. Routine work is automated so staff can focus on students.',
    },
    {
      icon: 'bi-shield-check',
      title: 'Secure data',
      body: 'Records are encrypted and access is limited by role. Every change is logged for accountability.',
    },
    {
      icon: 'bi-chat-dots',
      title: 'Better communication',
      body: 'Parents and teachers stay connected through grade updates and announcements as they happen.',
    },
  ];

  protected readonly faqs: readonly Faq[] = [
    {
      question: 'How do I get an account?',
      answer:
        "Accounts are created by the school registrar. Parents receive login details by text or email once their child's enrollment is approved. There is no self-registration.",
    },
    {
      question: 'I forgot my password. What do I do?',
      answer:
        'Select "Forgot password" on the sign-in page and enter your registered email or mobile number. A reset link arrives within a few minutes. If it does not, contact the registrar\'s office.',
    },
    {
      question: "Is my child's information secure?",
      answer:
        'Yes. All records are encrypted, and access is limited by role. Teachers see only their own classes, and parents see only their own children. Every record change is logged.',
    },
    {
      question: 'Can I view more than one child?',
      answer:
        'One parent account covers all your enrolled children. Switch between them from the dashboard. Let the registrar know if a child is missing from your list.',
    },
    {
      question: 'Do I need a computer to use this?',
      answer:
        "No. MESIMS works on any phone browser. If you would rather not use a device, the registrar's office can print grades and records on request.",
    },
    {
      question: 'Who do I contact for help?',
      answer:
        "For login and account problems, contact the registrar's office. For questions about grades, message your child's teacher through the parent portal.",
    },
  ];
}
