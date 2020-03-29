import React from 'react'
import { Segment, Grid} from 'semantic-ui-react'

const SegmentExampleSegment = () => (
    <Segment id="footer">
        <Grid columns={3} stackable id="grid">
            <Grid.Row id="footer-content">
                <Grid.Column>
                    <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa.</p>
                </Grid.Column>
                <Grid.Column>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>Aenean commodo ligula eget dolor.</p>
                    <p>Aenean massa. Cum sociis natoque</p>
                </Grid.Column>
                <Grid.Column>
                    <p>Lorem ipsum dolor sit amet</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    </Segment>
)

export default SegmentExampleSegment