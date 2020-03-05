import React from 'react'
import axios from 'axios'

class ImageUpload extends React.Component {

  state = {
    image: null
  }

  handleUpload = async ({ target: { files } }) => {
    const data = new FormData
    data.append('file', files[0])
    data.append('upload_preset', 'di8w5vef')
    const res = await axios.post('https://api.cloudinary.com/v1_1/drjzlxwhz/image/upload', data)
    this.setState({ image: res.data.url }, () => {
      this.props.handleChange({ target: { name: this.props.fieldName, value: res.data.url } })
    })
  }

  render() {
    const labelClass = this.props.labelClassName ? this.props.labelClassName : 'default_class'
    const { image } = this.state
    return (
      <>

        {image
          ?
          <div>
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
          </div>
          :
          <>
            <label className={labelClass}>{this.props.labelText}</label>
            <input
              className={this.props.inputClassName}
              type="file"
              onChange={this.handleUpload}
            />
          </>
        }
        
      </>
    )
  }
}

export default ImageUpload