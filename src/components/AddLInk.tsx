
import { useState } from 'react';

interface Props {
  handleSqueeze: (link: string) => void
}

const AddLink: React.FC<Props> = ({ handleSqueeze }) => {

  const [link, setLink] = useState('')

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLink(e.target.value);
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleSqueeze(link);
    setLink('')
  }

  return (
    <div className="row">
      <form className="" onSubmit={handleSubmit}>
        <div className="add-link">
          <i className="material-icons prefix add-link__icon">insert_link</i>
          <input
            id="icon_prefix2"
            className="materialize-textarea s8 add-link__input"
            placeholder='Enter link'
            minLength={1}
            maxLength={65536}
            value={link}
            type="url"
            onChange={handleChange}
            required />
          <button type="submit" className="material-icons add-link__button">send</button>
        </div>
      </form>
    </div>
  )
}

export { AddLink };
