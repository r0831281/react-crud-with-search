import { useState, useEffect } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

import MockApi from '../apis/mock_api';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function Detail() {
  const { customerid } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [iAgree, setIAgree] = useState(false);

  useEffect(() => {
    if (customerid !== "0") {
      getCustomer(customerid);
    }
  }, [customerid]);

  const getCustomer = async (customerid) => {
    const result = await MockApi.getbyid(customerid);
    setFirstName(result.data.firstName);
    setLastName(result.data.lastName);
    setIAgree(result.data.iAgree);
  }

  const submitCustomer = async () => {
    var customer = { customerid, firstName, lastName, iAgree };
    if (customerid === "0") {
      await MockApi.post(customer);
    } else {
      await MockApi.put(customer);
    }
    navigate(-1);
  }

  return (
    <div>
      <Form className="create-form">
        <Form.Field>
          <label>First Name</label>
          <input value={firstName} placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input value={lastName} placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <Checkbox checked={iAgree} label='I agree to the Terms and Conditions' onChange={(e) => setIAgree(!iAgree)} />
        </Form.Field>
        <Button onClick={submitCustomer} type='button'>
          {(customerid === "0") && <>Add</>}
          {(customerid !== "0") && <>Update</>}
        </Button>
      </Form>
    </div>
  )
}
