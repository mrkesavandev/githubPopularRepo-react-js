import './index.css'
// Write your code here

const LanguageFilterItem = props => {
  const {filterDetails, setNewId, isActive} = props
  const {id, language} = filterDetails
  const btnClassName = isActive ? 'btn-active' : 'button'
  const clickButton = () => {
    setNewId(id)
  }

  return (
    <div>
      <button type="button" className={btnClassName} onClick={clickButton}>
        {language}
      </button>
    </div>
  )
}

export default LanguageFilterItem
