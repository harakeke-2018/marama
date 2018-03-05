import React from 'react'

import {connect} from 'react-redux'

import { getIwiGrants } from '../actions/iwi-grants.js'

class IwiGrants extends React.Component {
  componentDidMount () {
    this.props.dispatch(getIwiGrants(this.props.match.params.IwiGrants))
  }

  render () {
    return (
      <div className='typedetail-section'>
        <h1>Iwi Grants</h1>
        <p>Many iwi offer a range of different grants, scholarships and funding to help support their members in areas like education and research. Opportunities like these are often overlooked if you are unaware that they are out there.
Below are list of iwi that have grants you can apply for which is available for those who are registered with the iwi. If you are unsure if you are member, you can contact your iwi directly.
        </p>
        {this.props.iwiGrants.map(iwiGrant => (
          <div key={iwiGrant.id}>
            <a href={iwiGrant.link} target='_blank'><h3>{iwiGrant.iwi}</h3></a>
            <h4>{iwiGrant.description}</h4>
          </div>
        ))
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    iwiGrants: state.iwiGrants
  }
}

export default connect(mapStateToProps)(IwiGrants)