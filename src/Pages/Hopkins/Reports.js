import React, { useContext, useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useJaneHopkins } from "../../Config/Hopkins-Config";
import { useContextValues } from "../../Context/Context";
import { AgGridReact } from "ag-grid-react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
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
        <View style={styles.section}>
          <Text>Study Name:</Text>
          <Text>{data.StudyName}</Text>
        </View>
        <View style={styles.section}>
          <Text>Result:</Text>
          <Text>{data.result == "true" ? "Success!" : "Failure"}</Text>
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

export default function Reports() {
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
            <Card.Body>Search Fields</Card.Body>
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
              domLayout="autoHeight"
            ></AgGridReact>
          </div>
        </Col>
      </Row>
    </>
  );
}
