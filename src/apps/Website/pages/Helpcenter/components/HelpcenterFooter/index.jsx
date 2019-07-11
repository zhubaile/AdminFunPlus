import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Icon, Nav } from '@alifd/next';

export default class HelpcenterFooter extends Component {
   static displayName = 'HelpcenterFooter';

   constructor(props) {
     super(props);
     this.state = {};
   }
   render() {
     return (
       <div style={styles.container}>
         <div style={styles.left}>
           <h1 style={{ fontSize: '38px' }}>{this.props.FHcontent}</h1>
           <p style={{ fontSize: '20px', paddingTop: '25px', lineHeight: '36px' }}>{this.props.FPcontent}</p>
         </div>
         <div style={styles.right} />
       </div>
     );
   }
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundImage: `url(${require("@img/helpcenter/develop/ks-bg3.png")})`,
    backgroundSize: '100% 100%',
  },
  left: {
    width: '65%',
    marginTop: '200px',
    marginBottom: '100px',
    color: '#fff',
  },
  right: {
    width: '35%',
  },
};
