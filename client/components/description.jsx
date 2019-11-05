import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';


function Description({
  prodInfo,
  prodInfo: {seller_msg}
}) {
  let specs = prodInfo.item_Spec;
  let arr = []
  //for in loop to filter out item specs with no data
  for(let key in specs) {
    if(specs[key] !== "") {
      arr.push(`${key}:`);
      arr.push(specs[key])
    }
  };
  //format data so i have an array of arrays with 4 items in each for rendering
  let format = []
    while(arr.length > 0) {
      let curr =[]
      curr.push(arr.slice(0,4));
      format.push(curr);
      arr.splice(0,4)
    }

    return (
    <StyledDesc data-test="desc-section">
        <ItemNumber>eBay item number: {prodInfo.item_number}</ItemNumber>
        <p>Seller assumes all responsibility for this listing.</p>
        <p>Last updated on {prodInfo.list_date} <a href="#"> View all revisions</a></p>
      <ItemSpec>
        <Header>Item specifics</Header>
        <ItemTable>
          <tbody>
            {format.map(row => {
              return (
                <tr key={row[0]}>
                  <td>{row[0][0]}</td>
                  <td>{row[0][1]}</td>
                  <td>{row[0][2]}</td>
                  <td>{row[0][3]}</td>
                </tr>
              )
            })}
          </tbody>
        </ItemTable>
      </ItemSpec>
      <AboutProd>
        <Header>{seller_msg.item_des}</Header>
        <AboutPar>{seller_msg.prod_des}</AboutPar>
        <img src={seller_msg.img_url} alt="random stuff" height="250px" width="250px"></img>
      </AboutProd>
    </StyledDesc>
  )
}

Description.propTypes = {
  prodInfo:PropTypes.shape({
    item_number: PropTypes.number,
    list_date: PropTypes.string,
    item_Spec: PropTypes.object,
    seller_msg: PropTypes.shape({
      prod_des: PropTypes.string,
      item_des: PropTypes.string,
      img_url: PropTypes.string
    })
  })
}

export default Description

const StyledDesc = styled.div`
font-family: "Helvetica neue",Helvetica,Verdana,Sans-serif;
font-size: 12px;
`
const ItemNumber = styled.p`
  text-align: right;
  padding-top: 0px;
`


const ItemSpec = styled.div`
  border: 1px solid black;
  padding-left:
`

const AboutProd = styled.div`

`
const Header = styled.h1`
  margin-top: 5px;
  margin-bottom: 5px;
  padding-left: 10px;
  font-size: 16px;
`
const AboutPar = styled.p`
  width: 65%;
  float: left;
  padding-left:10px;
  margin-right: 15px;
  font-size: 14px;
`
const AboutImg = styled.img`
  float: right;
  clear: none;
  margin: 15px;
`
const ItemTable = styled.table`
  table-layout: auto;
  padding: 10px;
  width: 100%;
  tr, td {
    padding: 5px;
  }
`
