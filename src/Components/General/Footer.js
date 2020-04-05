import React from 'react'
import { Segment, Grid} from 'semantic-ui-react'

const SegmentExampleSegment = () => (
    <Segment id="footer">
        <Grid columns={3} stackable id="grid">
            <Grid.Row id="footer-content">
                <Grid.Column>
                    <p>www.internationalbreweriesplc.com</p>
                </Grid.Column>
                <Grid.Column>
                    <p>Anuoluwapo: 0906-251-4232</p>
                    <p>Titi: 0701-587-3784</p>
                </Grid.Column>
                <Grid.Column>
                <p>Address: 22/36 Glover Road, Ikoyi-Lagos</p>
                </Grid.Column>
            </Grid.Row>
        </Grid>

    </Segment>
)

export default SegmentExampleSegment