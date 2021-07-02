import React, {FC, ReactElement, useCallback, useState} from 'react';
import {Provider} from 'react-redux';
import {
  Layout,
  Menu,
} from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  FileOutlined,
} from '@ant-design/icons';

const {SubMenu} = Menu;
const {
  Header,
  Content,
  Sider,
} = Layout;

import {store} from '../../store';
import {AppProps} from './types';
import './style.scss';

const App: FC<AppProps> = (props: AppProps): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapsed = (): void => {
    setCollapsed(!collapsed);
  };

  return (
    <Provider store={store}>
      <Layout style={{minHeight: '100vh'}}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{padding: 0}} />
          <Content style={{margin: '0 16px'}}>
          </Content>
        </Layout>
      </Layout>
    </Provider>
  );
};

export default App;
