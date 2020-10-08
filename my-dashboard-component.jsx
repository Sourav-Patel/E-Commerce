import React from 'react'
import { Box } from 'admin-bro'
import { Button } from 'react-bootstrap';


const Dashboard = (props) => {
  return (
    <Box><div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}
  >
      <div style={{
          display: "flex",
          flexFlow: "row",
      }}>
          
    <a style={{
      padding: "20px",
      backgroundColor: "#000",
      color: "#fff",
      textDecoration: "none",
      marginTop: "2rem",
      borderRadius: "10px",
      marginRight: "20px",
      textAlign: "center",
    }} href="/admin/resources/Product" variant="dark">Products</a>
    <a style={{
      padding: "20px",
      backgroundColor: "#000",
      marginTop: "2rem",
      borderRadius: "10px",
      marginRight: "20px",
      textAlign: "center",
      color: "#fff",
      textDecoration: "none",
    }} href="/admin/resources/Customer" variant="dark">Customers</a>
    <a style={{
      padding: "20px",
      backgroundColor: "#000",
      marginTop: "2rem",
      borderRadius: "10px",
      marginRight: "20px",
      textAlign: "center",
      color: "#fff",
      textDecoration: "none",
    }} href="/admin/resources/Blog" variant="dark">Blogs</a>
      </div>
    
  </div></Box>
  )
}

export default Dashboard