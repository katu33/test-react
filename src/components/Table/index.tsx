import React, { useEffect } from 'react';

interface IProps {
  titleTable: string[];
  dataTable: any[];
}

const TableComponent: React.FC<IProps> = ({ titleTable, dataTable }) => {
  const [currentPage, setCurrentPage] = React.useState<number>(0);
  const [data, setData] = React.useState<any[][]>([]);

  const limit: number = 5;
  const pagination = new Array(Math.round(dataTable.length / limit)).fill(null);

  const convertDataPagination = (data: any[]) => {
    const cloneData = [...data];
    const result = [];
    while (cloneData.length > 0) {
      result.push(cloneData.splice(0, limit));
    }
    return result;
  };

  const renderTitle = () => (
    <tr>
      {titleTable && titleTable.map((title) => <th key={title}>{title}</th>)}
    </tr>
  );

  const renderBody = () => (
    <>
      {data &&
        data.length > 0 &&
        data[currentPage].map((row) => (
          <tr>
            {row &&
              row.map((item: any, index: number) => (
                <td key={`row-${index}`}>{item}</td>
              ))}
          </tr>
        ))}
    </>
  );

  useEffect(() => {
    setData(convertDataPagination(dataTable));
  }, [dataTable]);

  return (
    <div className='col-lg-12 grid-margin stretch-card'>
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <table className='table table-striped'>
              <thead>{renderTitle()}</thead>
              <tbody>{renderBody()}</tbody>
            </table>
          </div>

          <nav className='mt-4'>
            <ul className='pagination'>
              {pagination.map((_, index) => (
                <li
                  className={`page-item cursor ${
                    index === currentPage ? 'active' : null
                  }`}
                  onClick={() => setCurrentPage(index)}
                >
                  <span className='page-link'>{index + 1}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
