import { ThemeConfig } from 'antd';

export const theme: ThemeConfig = {
  components: {
    Message: {
      contentBg: 'var(--foreground-color)',
    },
  },
  token: {
    fontSize: 16,
    fontFamily: 'var(--font-teachers), sans-serif',
    colorTextHeading: 'var(--title-color)', // h1,h2,h3,h4,h5
    colorText: 'var(--paragraph-color)', // Typography.Paragraph
  },
};
