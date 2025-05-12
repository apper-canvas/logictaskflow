import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature({ board }) {
  // Icon declarations
  const Plus = getIcon("Plus");
  const Trash2 = getIcon("Trash2");
  const Edit = getIcon("Edit");
  const Calendar = getIcon("Calendar");
  const Tag = getIcon("Tag");
  const X = getIcon("X");
  const Save = getIcon("Save");
  const Clock = getIcon("Clock");
  
  // Initial lists with some sample cards
  const [lists, setLists] = useState([
    {
      id: 1,
      title: "To Do",
      cards: [
        { id: 101, title: "Research competitors", description: "Analyze top 5 competitors", labels: ["research"], dueDate: "2023-06-30" },
        { id: 102, title: "Create wireframes", description: "Design initial mockups", labels: ["design"], dueDate: "2023-07-01" }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        { id: 201, title: "Develop MVP", description: "Create minimal viable product", labels: ["development"], dueDate: "2023-07-15" }
      ]
    },
    {
      id: 3,
      title: "Done",
      cards: [
        { id: 301, title: "Project planning", description: "Initial project scope and timeline", labels: ["planning"], dueDate: "2023-06-15" }
      ]
    }
  ]);
  
  // Form states
  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListTitle, setNewListTitle] = useState("");
  
  const [showNewCardForm, setShowNewCardForm] = useState(null); // null or listId
  const [newCardData, setNewCardData] = useState({
    title: "",
    description: "",
    dueDate: "",
    labels: []
  });
  
  const [editingCard, setEditingCard] = useState(null);
  
  // Available label options with colors
  const labelOptions = [
    { id: "design", name: "Design", color: "#8b5cf6" },
    { id: "development", name: "Development", color: "#3b82f6" },
    { id: "research", name: "Research", color: "#10b981" },
    { id: "planning", name: "Planning", color: "#f97316" },
    { id: "bug", name: "Bug", color: "#ef4444" }
  ];
  
  // Handle adding a new list
  const handleAddList = (e) => {
    e.preventDefault();
    
    if (!newListTitle.trim()) {
      toast.error("List title cannot be empty");
      return;
    }
    
    const newList = {
      id: Date.now(),
      title: newListTitle,
      cards: []
    };
    
    setLists([...lists, newList]);
    setNewListTitle("");
    setShowNewListForm(false);
    toast.success("New list added");
  };
  
  // Handle adding a new card to a list
  const handleAddCard = (e, listId) => {
    e.preventDefault();
    
    if (!newCardData.title.trim()) {
      toast.error("Card title cannot be empty");
      return;
    }
    
    const newCard = {
      id: Date.now(),
      ...newCardData
    };
    
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: [...list.cards, newCard]
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    setNewCardData({
      title: "",
      description: "",
      dueDate: "",
      labels: []
    });
    setShowNewCardForm(null);
    toast.success("New card added");
  };
  
  // Handle updating a card
  const handleUpdateCard = (e, listId, cardId) => {
    e.preventDefault();
    
    if (!editingCard.title.trim()) {
      toast.error("Card title cannot be empty");
      return;
    }
    
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.map(card => 
            card.id === cardId ? { ...editingCard } : card
          )
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    setEditingCard(null);
    toast.success("Card updated");
  };
  
  // Handle deleting a card
  const handleDeleteCard = (listId, cardId) => {
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          cards: list.cards.filter(card => card.id !== cardId)
        };
      }
      return list;
    });
    
    setLists(updatedLists);
    toast.success("Card deleted");
  };
  
  // Handle toggling a label on a card
  const handleToggleLabel = (label) => {
    if (editingCard) {
      // For editing existing card
      const isLabelSelected = editingCard.labels.includes(label.id);
      
      setEditingCard({
        ...editingCard,
        labels: isLabelSelected
          ? editingCard.labels.filter(id => id !== label.id)
          : [...editingCard.labels, label.id]
      });
    } else {
      // For new card form
      const isLabelSelected = newCardData.labels.includes(label.id);
      
      setNewCardData({
        ...newCardData,
        labels: isLabelSelected
          ? newCardData.labels.filter(id => id !== label.id)
          : [...newCardData.labels, label.id]
      });
    }
  };
  
  // Handle card drag and drop with react-beautiful-dnd
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination or the card was dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId)) {
      return;
    }

    // Find the source list and card
    const sourceList = lists.find(list => list.id.toString() === source.droppableId);
    const card = sourceList.cards.find(card => card.id.toString() === draggableId);

    // Create new lists array with the card moved
    const newLists = lists.map(list => {
      // Remove from source list
      if (list.id.toString() === source.droppableId) {
        return { ...list, cards: list.cards.filter(c => c.id.toString() !== draggableId) };
      // Add to destination list
      } else if (list.id.toString() === destination.droppableId) {
        return { ...list, cards: [...list.cards, card] };
      }
      return list;
    });

    setLists(newLists);
    toast.success("Card moved successfully");
    
    toast.success("Card moved successfully");
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div className="mb-4">
        <div className="flex items-center">
          <span 
            className="w-4 h-4 rounded-full mr-3"
            style={{ backgroundColor: board.color }}
          ></span>
          <h2 className="text-2xl font-bold">{board.title}</h2>
        </div>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4">
          <DragDropContext onDragEnd={onDragEnd}>
            {/* Lists */}
            {lists.map(list => (
              <div 
                key={list.id}
              className="w-80 flex-shrink-0 bg-surface-100 dark:bg-surface-800 rounded-xl shadow-sm overflow-hidden"
            >
              {/* List Header */}
              <div className="p-3 bg-surface-200 dark:bg-surface-700 border-b border-surface-300 dark:border-surface-600">
                <h3 className="font-semibold">{list.title}</h3>
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
              <Droppable droppableId={list.id.toString()}>
                {(provided) => (
                  <div 
                    className="p-2 min-h-[200px] max-h-[70vh] overflow-y-auto scrollbar-hide"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {list.cards.map((card, index) => (
                      <Draggable 
                        key={card.id.toString()} 
                        draggableId={card.id.toString()} 
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            layout
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            className={`mb-2 p-3 bg-white dark:bg-surface-800 rounded-lg shadow-sm border-l-4 transition-all ${
                              snapshot.isDragging ? 'opacity-40' : 'opacity-100'
                            } cursor-pointer hover:shadow-md`}
                            style={{ 
                              borderLeftColor: card.labels?.[0] ? labelOptions.find(l => l.id === card.labels[0])?.color : 'transparent',
                              ...provided.draggableProps.style
                            }}
                          >
                             <div className="flex justify-between mb-1">
                               <h4 className="font-medium text-sm">{card.title}</h4>
                               <div className="flex space-x-1">
                                 <button
                                   onClick={(e) => {e.stopPropagation(); setEditingCard({...card})}}
                                   className="p-1 text-surface-500 hover:text-blue-500 dark:text-surface-400 dark:hover:text-blue-400 rounded"
                                 >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={(e) => {e.stopPropagation(); handleDeleteCard(list.id, card.id)}}
                          className="p-1 text-surface-500 hover:text-red-500 dark:text-surface-400 dark:hover:text-red-400 rounded"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      </div>
                    </div>
                    
                    {card.description && (
                      <p className="text-sm text-surface-600 dark:text-surface-300 mb-2 line-clamp-2">
                        {card.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-1 mb-2">
                        const label = labelOptions.find(l => l.id === labelId);
                        return label ? (
                          <span 
                            key={labelId}
                      {card.labels && card.labels.map(labelId => {
                            className="inline-flex items-center text-xs px-2 py-0.5 rounded-full"
                            style={{ 
                              backgroundColor: `${label.color}20`, 
                              color: label.color 
                            }}
                          >
                            <Tag size={10} className="mr-1" />
                            {label.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                    
                    {card.dueDate && (
                      <div className="flex items-center text-xs text-surface-500 dark:text-surface-400">
                        <Clock size={12} className="mr-1" />
                        {new Date(card.dueDate).toLocaleDateString()}
                      </div>
                    )}
                    <div className="absolute inset-0 cursor-pointer" onClick={() => setEditingCard({...card})}></div>
                  </motion.div>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}

                <AnimatePresence>
                  {showNewCardForm === list.id && (
                    <motion.form

                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={(e) => handleAddCard(e, list.id)}
                      className="overflow-hidden"
                    >
                      <div className="bg-white dark:bg-surface-800 rounded-lg p-3 mb-2 shadow-sm">
                        <div className="mb-3">
                          <input
                            type="text"
                            placeholder="Card title"
                            className="input text-sm"
                            value={newCardData.title}
                            onChange={(e) => setNewCardData({...newCardData, title: e.target.value})}
                            autoFocus
                          />
                        </div>
                        
                        <div className="mb-3">
                          <textarea
                            placeholder="Description (optional)"
                            rows="2"
                            className="input text-sm"
                            value={newCardData.description}
                            onChange={(e) => setNewCardData({...newCardData, description: e.target.value})}
                          ></textarea>
                        </div>
                        
                        <div className="mb-3">
                          <label className="label">Due Date (optional)</label>
                          <div className="relative">
                            <Calendar size={16} className="absolute left-3 top-2.5 text-surface-400" />
                            <input
                              type="date"
                              className="input text-sm pl-9"
                              value={newCardData.dueDate}
                              onChange={(e) => setNewCardData({...newCardData, dueDate: e.target.value})}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="label">Labels</label>
                          <div className="flex flex-wrap gap-2">
                            {labelOptions.map(label => (
                              <button 
                                key={label.id}
                                type="button"
                                onClick={() => handleToggleLabel(label)}
                                className={`inline-flex items-center text-xs px-2 py-1 rounded-full transition-colors ${
                                  newCardData.labels.includes(label.id)
                                    ? 'opacity-100'
                                    : 'opacity-60 hover:opacity-80'
                                }`}
                                style={{ 
                                  backgroundColor: newCardData.labels.includes(label.id) 
                                    ? `${label.color}20` 
                                    : 'transparent',
                                  border: `1px solid ${label.color}`,
                                  color: label.color
                                }}
                              >
                                <Tag size={10} className="mr-1" />
                                {label.name}
                              </button>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex justify-between">
                          <button type="submit" className="btn btn-primary py-1 px-3 text-sm">
                            <Plus size={14} className="mr-1" />
                            Add Card
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setShowNewCardForm(null)}
                            className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
                
                {/* Add Card Button */}
                {showNewCardForm !== list.id && (
                  <button
                    onClick={() => setShowNewCardForm(list.id)}
                    className="w-full p-2 text-left text-surface-500 dark:text-surface-400 hover:text-primary dark:hover:text-primary-light hover:bg-surface-50 dark:hover:bg-surface-700/50 rounded-lg transition-colors"
                  >
                    <span className="flex items-center">
                      <Plus size={16} className="mr-1" />
                      Add Card
                    </span>
                  </button>
                )}
              </div>
                )}
              </Droppable>
            </div>
          ))}
          
          {/* Add New List */}
          <div className="w-80 flex-shrink-0">
            {showNewListForm ? (
              <form onSubmit={handleAddList} className="bg-surface-100 dark:bg-surface-800 rounded-xl p-3 shadow-sm">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter list title"
                    className="input text-sm"
                    value={newListTitle}
                    onChange={(e) => setNewListTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                
                <div className="flex justify-between">
                  <button type="submit" className="btn btn-primary py-1 px-3 text-sm">
                    <Plus size={14} className="mr-1" />
                    Add List
                  </button>
                  
                  <button 
                    type="button" 
                    onClick={() => setShowNewListForm(false)}
                    className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setShowNewListForm(true)}
                className="w-full h-12 flex items-center justify-center bg-surface-100/50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 rounded-xl border-2 border-dashed border-surface-200 dark:border-surface-700 text-surface-500 dark:text-surface-400 transition-colors"
              >
                <Plus size={18} className="mr-2" />
                Add Another List
              </button>
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
      
      {/* Edit Card Modal */}
      <AnimatePresence>
        {editingCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center p-4 z-50"
            onClick={() => setEditingCard(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {lists.map(list => {
                const card = list.cards.find(c => c.id === editingCard.id);
                if (card) {
                  return (
                    <form key={card.id} onSubmit={(e) => handleUpdateCard(e, list.id, card.id)} className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Edit Card</h3>
                        <button 
                          type="button"
                          onClick={() => setEditingCard(null)}
                          className="p-1 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                      
                      <div className="mb-4">
                        <label className="label">Title</label>
                        <input
                          type="text"
                          placeholder="Card title"
                          className="input"
                          value={editingCard.title}
                          onChange={(e) => setEditingCard({...editingCard, title: e.target.value})}
                        />
                      </div>
                      
                      <div className="mb-4">
                        <label className="label">Description</label>
                        <textarea
                          placeholder="Description (optional)"
                          rows="3"
                          className="input"
                          value={editingCard.description}
                          onChange={(e) => setEditingCard({...editingCard, description: e.target.value})}
                        ></textarea>
                      </div>
                      
                      <div className="mb-4">
                        <label className="label">Due Date</label>
                        <div className="relative">
                          <Calendar size={16} className="absolute left-3 top-2.5 text-surface-400" />
                          <input
                            type="date"
                            className="input pl-9"
                            value={editingCard.dueDate || ""}
                            onChange={(e) => setEditingCard({...editingCard, dueDate: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <label className="label">Labels</label>
                        <div className="flex flex-wrap gap-2">
                          {labelOptions.map(label => (
                            <button 
                              key={label.id}
                              type="button"
                              onClick={() => handleToggleLabel(label)}
                              className={`inline-flex items-center text-xs px-2 py-1 rounded-full transition-colors ${
                                editingCard.labels?.includes(label.id)
                                  ? 'opacity-100'
                                  : 'opacity-60 hover:opacity-80'
                              }`}
                              style={{ 
                                backgroundColor: editingCard.labels?.includes(label.id) 
                                  ? `${label.color}20` 
                                  : 'transparent',
                                border: `1px solid ${label.color}`,
                                color: label.color
                              }}
                            >
                              <Tag size={10} className="mr-1" />
                              {label.name}
                            </button>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button" 
                          onClick={() => handleDeleteCard(list.id, card.id)}
                          className="btn bg-red-500 hover:bg-red-600 text-white py-1 px-3"
                        >
                          <Trash2 size={14} className="mr-1" />
                          Delete
                        </button>
                        <button type="submit" className="btn btn-primary py-1 px-3">
                          <Save size={14} className="mr-1" />
                          Save Changes
                        </button>
                      </div>
                    </form>
                  );
                }
                return null;
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default MainFeature;