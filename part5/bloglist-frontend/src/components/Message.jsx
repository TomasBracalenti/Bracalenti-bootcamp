import PropTypes from "prop-types"

const errorMessage = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  margin: 10,
}

const successMessage = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  margin: 10,
}

const Message = ({ content, severity }) => {
  return (
    <>
      {content && (
        <div>
          <p style={severity === "success" ? successMessage : errorMessage}>
            {content}
          </p>
        </div>
      )}
    </>
  )
}

Message.propTypes = {
  content: PropTypes.string,
  severity: PropTypes.string,
}

export default Message
