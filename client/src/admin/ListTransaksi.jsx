import React from 'react'
import { Dropdown, Table, ButtonGroup } from "react-bootstrap";
import NavbarAdmin from '../Components/NavbarAdmin';

function ListTransaksi() {
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
              <tbody>
                <tr className="text-light">
                  <td>1</td>
                  <td className="text-light">Radif Ganteng</td>
                  <td>bca.jpg</td>
                  <td className="text-light">26 / Hari</td>
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
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

export default ListTransaksi