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
  tags: ["autodocs"],
  argTypes: {
    variant: {
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

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "DsButton",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "DsButton",
    disabled: false,
  },
};

export const Assistive: Story = {
  args: {
    variant: "assistive",
    children: "DsButton",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    variant: "primary",
    size: "small",
    children: "DsButton",
    disabled: false,
  },
};

export const Medium: Story = {
  args: {
    variant: "primary",
    size: "medium",
    children: "DsButton",
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    variant: "primary",
    size: "large",
    children: "DsButton",
    disabled: false,
  },
};

export const XLarge: Story = {
  args: {
    variant: "primary",
    size: "xlarge",
    children: "DsButton",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "DsButton",
    disabled: true,
  },
};

export const WithIcon: Story = {
  args: {
    variant: "primary",
    children: (
      <>
        <Mail className="mr-2 size-4" />
        <span>Login with Email</span>
      </>
    ),
  },
};

