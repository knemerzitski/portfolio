import { FormSchema } from "@/libs/form";

export const action = 'contactForm';

export const formSchema: Readonly<FormSchema> = {
  fullName: {
    type: 'text',
    label: 'Name',
    className: 'col-span-12 md:col-span-6',
    attributes: {
      required: true,
      maxLength: 256,
    }
  },
  email: {
    type: 'email',
    label: 'Email',
    className: 'col-span-12 md:col-span-6',
    attributes: {
      required: true,
      maxLength: 256,
    }
  },
  message: {
    type: 'textarea',
    label: 'Message',
    className: 'col-span-12',
    attributes: {
      required: true,
      maxLength: 4096,
      rows: 4,
    }
  }
};