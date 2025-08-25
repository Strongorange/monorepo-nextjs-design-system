import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { DsButton } from "@strongorange/ds-ui";
import { Mail } from "lucide-react";

const meta = {
  title: "UI/DsButton",
  component: DsButton,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "400px",
          backgroundColor: "var(--color-ds-neutral-400)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
        }}
      >
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  argTypes: {
    appearance: {
      control: { type: "select" },
      options: ["fill", "outline", "text"],
    },
    intent: {
      control: { type: "select" },
      options: ["primary", "secondary", "assistive"],
    },
    size: {
      control: { type: "select" },
      options: ["medium", "small", "large", "xlarge"],
    },
    fullWidth: {
      control: { type: "boolean" },
    },
    disabled: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<typeof DsButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FillPrimary: Story = {
  args: {
    appearance: "fill",
    intent: "primary",
    children: "DsButton",
    disabled: false,
  },
};

export const FillAssistive: Story = {
  args: {
    appearance: "fill",
    intent: "assistive",
    children: "DsButton",
    disabled: false,
  },
};

export const OutlinePrimary: Story = {
  args: {
    appearance: "outline",
    intent: "primary",
    children: "Outline Primary",
    disabled: false,
  },
};

export const OutlineSecondary: Story = {
  args: {
    appearance: "outline",
    intent: "secondary",
    children: "Outline Secondary",
  },
};

export const OutlineAssistive: Story = {
  args: {
    appearance: "outline",
    intent: "assistive",
    children: "Outline Assistive",
  },
};

export const TextPrimary: Story = {
  args: {
    appearance: "text",
    intent: "primary",
    children: "Text Button",
  },
};

export const Small: Story = {
  args: {
    appearance: "fill",
    intent: "primary",
    size: "small",
    children: "Small",
  },
};

export const Medium: Story = {
  args: {
    appearance: "fill",
    intent: "primary",
    size: "medium",
    children: "Medium",
  },
};

export const Large: Story = {
  args: {
    appearance: "fill",
    intent: "primary",
    size: "large",
    children: "Large",
  },
};

export const XLarge: Story = {
  args: {
    appearance: "fill",
    intent: "primary",
    size: "xlarge",
    children: "XLarge",
  },
};

export const Disabled: Story = {
  args: {
    appearance: "fill",
    intent: "primary",
    children: "Disabled",
    disabled: true,
  },
};

export const OutlinePrimaryWithIcon: Story = {
  args: {
    appearance: "outline",
    intent: "primary",
    children: (
      <>
        <Mail className="mr-2 size-4" />
        <span>Login with Email</span>
      </>
    ),
  },
};
