'use client';
import { useMemo, useState, useEffect } from 'react';
import { useServerInsertedHTML } from 'next/navigation';

import zhCN from 'antd/locale/zh_CN';
import { App, ConfigProvider, type ThemeConfig } from 'antd';
import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs';

import type { PropsWithChildren, FC } from 'react';
import type Entity from '@ant-design/cssinjs/es/Cache';


const AntdRegistry: FC<PropsWithChildren> = (props) => {
  const cache = useMemo<Entity>(() => createCache(), [createCache]);

  useServerInsertedHTML(() => (
    <style
      className="grin-style"
      dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }}
    />
  ));

  const [theme, setTheme] = useState<ThemeConfig>({} as ThemeConfig);
  useEffect(() => {
    const html = document.documentElement;
    const colorPrimary = getComputedStyle(html).getPropertyValue('--color-primary');
    setTheme ({
      hashed: false,
      cssVar: { prefix: 'grin' },
      token: {
        colorPrimary
      },
    });
  }, []);

  if(!theme?.token) return null;

  return (
    <StyleProvider cache={cache}>
      <ConfigProvider locale={zhCN} theme={theme}>
        <App {...props} message={{ maxCount: 1, duration: 3 }} />
      </ConfigProvider>
    </StyleProvider>
  );
};

export default AntdRegistry;
