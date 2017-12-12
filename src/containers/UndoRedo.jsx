import React from 'react'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { connect } from 'react-redux'

function UndoRedo({ canUndo, canRedo, onUndo, onRedo }){
	return (
		<div className="undoRedo">
			<button onClick={onUndo} disabled={!canUndo}>Undo</button>
			<button onClick={onRedo} disabled={!canRedo}>Redo</button>
		</div>
	);
}

const mapStateToProps = (state) => ({
	canUndo: state.listOfTasksToState.past.length > 0,
	canRedo: state.listOfTasksToState.future.length > 0
});

const mapDispatchToProps = ({
	onUndo: UndoActionCreators.undo,
	onRedo: UndoActionCreators.redo
});

export default connect(mapStateToProps, mapDispatchToProps)(UndoRedo)
