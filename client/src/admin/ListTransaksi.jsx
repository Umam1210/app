import React from 'react'
import NavbarAdmin from '../Components/NavbarAdmin';

import { Dropdown, Table, ButtonGroup } from "react-bootstrap";
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { UserContext } from '../context/UserContext'
import { useContext, useState } from 'react'
import { API } from '../config/api'

function ListTransaksi() {

  const [state] = useContext(UserContext)
  console.log("state", state)
  let { data: transactions } = useQuery('transactionsCache', async () => {
    const response = await API.get('/transactions');
    console.log("ini response", response)
    return response.data.data;
});



  return (
    <>
      <NavbarAdmin />
      <div className="" style={{ background: "black", height: "800px" }}>
        <div
          className="d-flex justify-content-center pb-5"
          style={{ background: "black" }}
        >
          <div className="bg-dark" style={{ width: "80%" }}>
            <div className="" style={{ background: "black" }}>
              <h3 className="text-light mb-4 p-4">Incoming Transsaction</h3>
            </div>
            <Table striped="columns">
              <thead>
                <tr className="text-danger">
                  <th>No</th>
                  <th className="text-danger">Users</th>
                  <th>Bukti Transfer </th>
                  <th className="text-danger">Remaining Active</th>
                  <th>Status User</th>
                  <th className="text-danger">Status Payment</th>
                  <th>Action</th>
                </tr>
              </thead>
              {transactions?.map((item, id) => {
                return(<tbody>
                <tr className="text-light">
                  <td>{item.user.id}</td>
                  <td className="text-light">{item.user.name}</td>
                  <td>bca.jpg</td>
                  <td className="text-light">2022-5-24 - 2022-6-24 </td>
                  <td>Active</td>
                  <td className="text-light">Approve</td>
                  <td>
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        img
                        variant="danger"
                        id="dropdown-custom-2"
                        background="none"
                        border-radius="10px"
                      />
                      <Dropdown.Menu className="bg-dark">
                        <Dropdown.Item eventKey="1" className="text-success">Approved</Dropdown.Item>
                        <Dropdown.Item eventKey="2" className="text-danger">cancel</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
              )
              })}
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListTransaksi