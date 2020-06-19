import React, { Component } from 'react';
import AppNavBar  from '../../Layouts/AppNavbar/AppNavbar';
import DataTable, { createTheme } from 'react-data-table-component';
import axios from "axios";
import styled from 'styled-components';

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJ1c2VybmFtZSI6ImRpbmdpdXNlciIsImV4cCI6MTU5NDIzMTk5MCwiZW1haWwiOiJ0ZXN0ZXJAZGluZ2kubGl2ZSIsIm9yaWdfaWF0IjoxNTkyNTAzOTkwfQ.owlQHopp-ltirNSzkdT2BXx0DvDx80hX96hZRj2_Alc';


const columns = [
  {
    name: 'Product',
    selector: 'product',
    sortable: true,
  },
  {
    name: 'Order Quantity',
    selector: 'order_quantity',
    sortable: true,
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
  },
  {
    name: 'Customer Name',
    selector: 'customer_name',
    sortable: true,
  },
  {
    name: 'Customer Work Area',
    selector: 'customer_work_area',
    sortable: true,
  },
  {
    name: 'District',
    selector: 'district',
    sortable: true,
  },
];

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;




// const FilterComponent = ({ filterText, onFilter, onClear }) => (
//   <>
//     <TextField id="search" type="text" placeholder="Filter By Name" value={filterText} onChange={onFilter} />
//     <button type="button" onClick={onClear}>X</button>
//   </>
// );

//   const [filterText, setFilterText] = React.useState('');
//   const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
//   const filteredItems = [1,2].filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));

//   const subHeaderComponentMemo = React.useMemo(() => {
//     const handleClear = () => {
//       if (filterText) {
//         setResetPaginationToggle(!resetPaginationToggle);
//         setFilterText('');
//       }
//     };

//     return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
//   }, [filterText, resetPaginationToggle]);


class ItemList extends Component {
  constructor(props){
    super(props);
  }
  state = {
    dataFromAPI: [],
    data: [],
    fields: [],
    loading: true,
    striped: true,
    highlight: true,
    pagination: true,
  }

  componentDidMount(){
    let self = this;
      axios.get('http://frontend.interview.dingi.work/user/data/',
        {
          headers: {
            'Authorization': `JWT ${token}`
          }
        }
      ).then(function (response) {

        self.setState({
          dataFromAPI: response.data,
          loading: false
        })
      
      })
      .catch(function (error) {
        console.log(error);
      });
    };  

  render() {

    return <div>

      <AppNavBar />
     <div className="container-fluid mt-2">
     <div className="card p-2">
     <DataTable
    title="Sales Data"
    columns={columns}
    data={this.state.dataFromAPI}
    progressPending={this.state.loading}
    pagination={this.state.pagination}
    highlightOnHover={this.state.highlight}
    striped={this.state.striped}
    
  />
     </div>
     </div>
      </div>;
  }
}

export default ItemList;
