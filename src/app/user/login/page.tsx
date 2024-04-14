'use client';
import { useState } from 'react';
import { Input } from 'antd';
import type { FC } from 'react';

const UserLoginPage: FC = () => {
  const [value, setValue] = useState<string>('');
  return (
      <Input
        value={value}
        placeholder="请输入"
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
  );
};

export default UserLoginPage;
