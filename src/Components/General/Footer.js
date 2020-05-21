import React from "react";
import { Segment, Grid } from "semantic-ui-react";

const SegmentExampleSegment = () => (
  <Segment id="footer">
    <Grid columns={3} stackable id="grid">
      <Grid.Row id="footer-content">
        <Grid.Column>
          <p>
            <a
              href="https://www.internationalbreweriesplc.com/"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              www.internationalbreweriesplc.com
            </a>
          </p>
        </Grid.Column>
        <Grid.Column>
          <p>Stephen: 0703-963-5385</p>
          <p>Titi: 0701-587-3784</p>
        </Grid.Column>
        <Grid.Column>
          <p>Address: 22/36 Glover Road, Ikoyi-Lagos</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);

export default SegmentExampleSegment;
