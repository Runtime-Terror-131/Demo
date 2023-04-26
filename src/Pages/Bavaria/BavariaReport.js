import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { useContextValues } from "../../Context/Context";
import { AgGridReact } from "ag-grid-react";
import logo from "../../images/pills.png";
import logo2 from "../../images/study.png";
import "../../Components/Style/GlobalStyle.css";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View>
          <Image
            src={logo}
            alt="LOGO"
            style={{
              width: "100px",
              height: "100px",
              float: "left",
            }}
          />
          <Image
            src={logo2}
            alt="LOGO"
            style={{
              width: "100px",
              height: "100px",
              position: "absolute",
              top: 0,
              right: 0,
            }}
          />
          <Text style={{ color: "#1d3263", textAlign: "center" }}>
            FDA Study Report
          </Text>
        </View>
        <View style={styles.section}>
          <Text>Study Name:</Text>
          <Text>{data.StudyName}</Text>
        </View>
        <View style={styles.section}>
          <Text>FDA Notes:</Text>
          <Text>{data.notes}</Text>
        </View>
        <View style={styles.section}>
          <Text>Result:</Text>
          <Text>{data.result == "true" ? "Success!" : "Failure"}</Text>
        </View>
        <View style={styles.section}>
          <Text>Number of Participants:</Text>
          <Text>{data.numberOfParticipants}</Text>
        </View>
        <View style={styles.section}>
          <Text>StudyID:</Text>
          <Text>{data.StudyID}</Text>
        </View>
      </Page>
    </Document>
  );
};

const DownloadCell = (props) => {
  return (
    <PDFDownloadLink
      document={<MyDocument data={props.data} />}
      fileName={"Report.pdf"}
      style={{ color: "blue" }}
    >
      {({ blob, url, loading, error }) =>
        loading ? "Report loading..." : "Report ready to download"
      }
    </PDFDownloadLink>
  );
};

// A polyfill for the arrayBuffer() method used in the DownloadCell component
function myArrayBuffer() {
  // this: Blob
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(this);
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

export default function BavariaReport() {
  const { getReports } = useJaneHopkins();
  const { setShowGridSpinner } = useContextValues();
  const [reports, setReports] = useState([]);

  const columnDefs = [
    { field: "download", cellRenderer: DownloadCell },
    { field: "id" },
    { field: "result" },
    { field: "StudyName" },
    { field: "numberOfParticipants" },
  ];

  useEffect(() => {
    setShowGridSpinner(true);
    try {
      getReports().then((result) => {
        setReports(result.items);
        setShowGridSpinner(false);
      });
    } catch (e) {
      console.log(e);
      setShowGridSpinner(false);
    }
  }, []);

  return (
    <>
      <Row>
        <Col lg={8}>
          <Card>
            <Card.Header>Reports</Card.Header>
            <Card.Body>
              Reports will be added once they are created by fda. click the
              download link to download a PDF format
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <div
            className="ag-theme-alpine box-shadow"
            style={{ marginTop: "5px", marginBottom: "5px" }}
          >
            <AgGridReact
              rowData={reports}
              columnDefs={columnDefs}
              pagination={true}
              paginationPageSize={10}
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </>
  );
}
