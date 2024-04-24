function RemovedSuccess() {
  const deletedMsgs = [
    "It sucks it has come to this",
    "Sorry to see your game meet its end",
    "It didn't work out here, but there may be hope for your game elsewhere",
    "This may not necessarily be the end, but a new beginning",
    "It's time to recoup, reimagine, and restart",
    "Gone for now, but you'll be back. They always come back",
  ];
  return (
    <>
      <h1>Your Project Has Been Successfully Removed</h1>
      {deletedMsgs &&
        deletedMsgs.map((messages) => (
          <div className="messages">{messages}</div>
        ))}
    </>
  );
}

export default RemovedSuccess
