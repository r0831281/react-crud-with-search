import { useEffect, useState } from 'react';
import { Table, Button, Form } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import MockApi from '../apis/mock_api';
import { mockComponent } from 'react-dom/test-utils';


export default function List() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  const getCustomers = async () => {
    const result = await MockApi.get();
    setCustomers(result.data);
  }

  useEffect(() => {
    getCustomers()
  }, []);

  const handleDelete = async (id) => {
    await MockApi.delete(id);
    await getCustomers();
  }

useEffect(() => {
  if (search.target.value === '') {
    getCustomers();
  }
    setCustomers(
      customers.filter((customer) => {
        return customer.firstName.toLowerCase().includes(search.target.value.toLowerCase());
      })
    );

}, [search]);

  return (
    <div>
      <Link to='/create/0'><Button>Create</Button></Link>
        <input type="text" onChange={(e) => setSearch(e)} value={search.value} placeholder="Search by first name"></input>  
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>First Name</Table.HeaderCell>
            <Table.HeaderCell>Last Name</Table.HeaderCell>
            <Table.HeaderCell>I Agree</Table.HeaderCell>
            <Table.HeaderCell>Update</Table.HeaderCell>
            <Table.HeaderCell>Delete</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer) => {
            return (
              <Table.Row key={customer.id}>
                <Table.Cell>{customer.firstName}</Table.Cell>
                <Table.Cell>{customer.lastName}</Table.Cell>
                <Table.Cell>{customer.iAgree ? 'Checked' : 'Unchecked'}</Table.Cell>
                <Table.Cell><Link to={'/update/' + customer.id}><Button>Edit</Button></Link></Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleDelete(customer.id)}>Delete</Button>
                </Table.Cell>
              </Table.Row>
            )
          })}
        </Table.Body>
      </Table>
    </div>
  )
}
