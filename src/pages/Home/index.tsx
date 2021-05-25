import React, { useEffect } from 'react';
import AuthService from '../../common/services/auth';
import TableComponent from '../../components/Table';

const HomePage = () => {
  const titleTable: string[] = ['id', 'name', 'email', 'phone', 'avatar'];
  const [dataTable, setDataTable] = React.useState<any[][]>([]);

  const convertDataToTable = (data: any[]): any[][] => (
    data.map(
      ({ id, name, email, phone, avatar }) => [
        id,
        <img src={avatar} alt='user' />,
        name,
        email,
        phone
      ]
    )
  )

  useEffect(() => {
    AuthService.getUsers().then((res) => {
      if (Array.isArray(res)) {
        setDataTable(convertDataToTable(res));
      }
    }).catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <TableComponent titleTable={titleTable} dataTable={dataTable} />
    </div>
  );
};

export default HomePage;
