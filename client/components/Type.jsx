import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import {getTypeDetail} from '../actions/type-details'

class Type extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      typeDetail: []
    }
  }

  componentDidMount () {
    this.props.dispatch(getTypeDetail(this.props.match.params.type))
  }

  render () {
    return (
      <div className='type-section'>
        <h1>Study</h1>
        {this.props.typeDetails.study.map(detail => (
          <div key={detail.study_id}>
            <Link to={`/interests/${this.props.match.params.interest}/${this.props.match.params.type}/${detail.course}`}>
              <p>{detail.course}</p>
            </Link>
            <p>{detail.provider}</p>
            <div>
            </div>
          </div>
        )
        )}
        <h1>Jobs</h1>
        {this.props.typeDetails.jobs.map(job => (
          <div key={job.jobs_id}>
            <Link to={`/interests/${this.props.match.params.interest}/${this.props.match.params.type}/${job.name}`}>
              <p>{job.job_name}</p>
            </Link>
          </div>
        ))}
        <h1>Help</h1>
        {this.props.typeDetails.help.map(help => (
          <div key={help.id}>
            <Link to={`/interests/${this.props.match.params.interest}/${this.props.match.params.type}/${help.name}`}>
              <p>{help.help_name}</p>
            </Link>
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    typeDetails: state.typeDetails
  }
}

export default connect(mapStateToProps)(Type)
