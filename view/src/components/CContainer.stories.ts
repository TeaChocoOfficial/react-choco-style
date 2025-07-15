//-Path: "react-choco-style/view/src/components/CContainer.stories.ts"
import type { Meta, StoryObj } from '@storybook/react';
import { CContainer } from '@teachoco-official/react-choco-style';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CContainer> = {
    title: 'choco components/CContainer',
    component: CContainer,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
    args: {
        children: 'CContainer Default',
    },
};

export const Main: Story = {
    args: {
        content: 'main',
        children: 'CContainer Main',
    },
};

export const Header: Story = {
    args: {
        content: 'header',
        children: 'CContainer Header',
    },
};

export const Content: Story = {
    args: {
        content: 'content',
        children: 'CContainer Content',
    },
};
