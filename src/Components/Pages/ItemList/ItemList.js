import React, { Component } from 'react';
import AppNavBar  from '../../Layouts/AppNavbar/AppNavbar';
import DataTable from 'react-data-table-component';
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
    subHeader: true,
    subHeaderAlign: 'right',
    searchValue: ''

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
          data: response.data,
          loading: false
        })
      
      })
      .catch(function (error) {
        console.log(error);
      });
    };  
    onKeyDown = (e) => {
      
     if(e.keyCode === 8){
      this.setState({
        data: this.state.dataFromAPI,
      })
     }
     
    }
    search = (e) => {
      let filterText = e.target.value.replace(/\s/g, '').toLowerCase();
      this.setState({
        searchValue: filterText,
      })
      let filteredData = [];
       
        this.setState({
          data: this.state.dataFromAPI,
        })

      if(filterText){

        filteredData = this.state.data.filter(function(item){
          return item.product.toLowerCase().includes(filterText) || item.district.toLowerCase().includes(filterText);
       });
        this.setState({
          data: filteredData,
        })
      }

     
    }
    resetSearch = () => {
     
      this.setState({
        data: this.state.dataFromAPI,
        searchValue: ''
      })

    }
  render() {

    return <div>

      <AppNavBar />
     <div className="container-fluid mt-2">
     <div className="card p-2">
     <DataTable
    title="Sales Data"
    columns={columns}
    data={this.state.data}
    progressPending={this.state.loading}
    pagination={this.state.pagination}
    highlightOnHover={this.state.highlight}
    striped={this.state.striped}
    subHeader={this.state.subHeader}
    subHeaderComponent={
      (
        <div className="input-group col-3">
          <input type="text" className='form-control' name='search' placeholder="Search Product or District" value={this.state.searchValue} onChange={this.search} onKeyDown={this.onKeyDown}/>
          <div className="input-group-append">
            <button className="btn btn-outline-danger" type="button" onClick={this.resetSearch}><span aria-hidden="true">&times;</span></button>
          </div>
        </div>
       
      )
    }
    subHeaderAlign={this.state.subHeaderAlign}
    
  />
     </div>
     </div>
      </div>;
  }
}

export default ItemList;
