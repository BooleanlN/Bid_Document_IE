import { Component } from "react";
import { Input, Row, Col } from "antd";
const style = { padding: "8px 0" };
const { Search } = Input;
import Folders from "./components/folders";
import { DocNumberByBid } from "../service";

class Bidings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
    };
  }
  componentDidMount() {
     this.doGetData()
  }
  doGetData = () => {
    DocNumberByBid().then((res) => {
      this.setState({
        folders: res.data.map(item => {
          return {
            name: item.bidName,
            id: item.bidId,
          };
        }),
      });
    });
  };
  render() {
    return (
      <>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}>
            <div style={style}>
              <Search
                placeholder="查找标的物"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
              ></Search>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <Folders folders={this.state.folders} name="fuck"></Folders>
        </Row>
      </>
    );
  }
}
export default Bidings;
