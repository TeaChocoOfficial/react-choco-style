//-Path: "react-choco-style/src/components/CButton.stories.ts"
import { CButton } from './CButton';
import { fn } from '@storybook/test';
import type { Meta, StoryObj } from '@storybook/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'choco components/CButton',
    component: CButton,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        // backgroundColor: { control: 'color' },
    },
    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: { onClick: fn() },
} satisfies Meta<typeof CButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        setClr: 'secondary',
        children: 'CButton Default',
    },
};

export const Primary: Story = {
    args: {
        setClr: 'primary',
        children: 'CButton primary',
    },
};

export const Error: Story = {
    args: {
        setClr: 'error',
        children: 'CButton error',
    },
};

export const Success: Story = {
    args: {
        setClr: 'success',
        children: 'CButton success',
    },
};

export const Warning: Story = {
    args: {
        setClr: 'warning',
        children: 'CButton warning',
    },
};

export const Info: Story = {
    args: {
        setClr: 'info',
        children: 'CButton info',
    },
};
