/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Table, Tag, Dropdown, Button, Icon, Menu } from 'antd';
import Moment from 'react-moment';
import ContractDetail from '../contractDetail';

const ConstractTable = props => {
  console.log(props);
  const { data } = props;
  const { contracts } = data;

  const [modal, setShowModal] = useState(false);
  const [currentContract, setCurrentContract] = useState(0);

  const openModal = v => {
    setCurrentContract(v);
    setShowModal(true);
  };

  const menu = [];
  if (contracts !== undefined)
    for (let i = 0; i < contracts.length; i += 1) {
      menu.push(
        <Menu>
          <Menu.Item key="1">Thanh toán</Menu.Item>
          <Menu.Item key="2">Đánh giá</Menu.Item>
          <Menu.Item key="3">Khiếu nại</Menu.Item>
          <Menu.Item key="4" onClick={() => openModal(i)}>
            Xem chi tiết
          </Menu.Item>
        </Menu>,
      );
    }

  const columns = [
    {
      title: 'Tên người đặt',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'term',
      key: 'term',
      render: val => <Moment format="DD/MM/YYYY">{val}</Moment>,
    },
    {
      title: 'Số giờ',
      dataIndex: 'hour',
      key: 'hour',
    },
    {
      title: 'Tổng chi phí',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Tình trạng',
      key: 'status',
      dataIndex: 'status',
      render: tags => (
        <span>
          {tags.map(tag => {
            let color = 'green';
            if (tag === 'fail') {
              color = 'volcano';
            }
            if (tag === 'success') {
              color = 'green';
            }
            if (tag === 'pending') {
              color = 'orange';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: i => (
        <span>
          <div id="components-dropdown-demo-dropdown-button" val={i.action}>
            <Dropdown overlay={menu[i.action]}>
              <Button>
                Thao tác
                <Icon type="down" />
              </Button>
            </Dropdown>
          </div>
        </span>
      ),
    },
  ];

  const contractData = [];
  if (contracts !== false && contracts !== undefined) {
    contracts.forEach((v, i) => {
      if (v !== 'error')
        contractData.push({
          name: v.student.name,
          term: v.beginTime,
          hour: v.totalHour,
          price: `${v.totalPrice} VND`,
          status: [v.status],
          action: i,
        });
    });
  }

  return (
    <div className="contractInfo">
      <Table
        style={{ height: '100%' }}
        columns={columns}
        dataSource={contractData}
        scroll={{ y: 320 }}
      />
      <ContractDetail
        modalState={modal}
        setModalVisible={setShowModal}
        data={data}
        userRole="tutor"
        currentContract={currentContract}
      />
    </div>
  );
};

export default ConstractTable;