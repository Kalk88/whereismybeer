import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { FunctionComponent } from 'react';
import { SearchProps } from './CommonProps';
import Loading from './Loading';
import {
  Card,
  CardText,
  CardBody,
  CardHeader,
  Container,
  Row,
  Col
} from 'reactstrap';
export const FETCH_BEVERAGE = gql`
    query pSearch($beverage: String!) {
        productSearch(SearchQuery: $beverage){
            ProductId
            ProductNameBold
            Price
            Volume
            AlcoholPercentage
        }
    }
`;

export interface Beverage {
    AlcoholPercentage: number,
    ProductId: number,
    ProductNameBold: string,
    Price: number,
    Volume: number
};

export const FindBeverage:FunctionComponent<SearchProps> = ({ query }) => {
    const { data, error, loading } = useQuery(FETCH_BEVERAGE, {variables: {beverage: query}});

    if (loading) {
      return <Loading />
    };
    if (error) {
      return <div>Error! {error.message}</div>;
    };

    return (
      <Container id="search-results" fluid>
        <Row noGutters>
          {data.productSearch.map((product: Beverage) => (
              <Col md="6" sm="4" key={product.ProductId}>
              <Card>
                  <CardHeader>{product.ProductNameBold}</CardHeader>
                <CardBody>
                  <CardText> Price: { product.Price } kr </CardText>
                  <CardText> Volume: { product.Volume } ml </CardText>
                  <CardText> Alcohol: { product.AlcoholPercentage } % </CardText>
                </CardBody>
              </Card>
              </Col>
          ))}
        </Row>
      </Container>
    );
}