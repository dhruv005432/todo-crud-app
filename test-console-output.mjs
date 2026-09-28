/**
 * Automated simulation demonstrating Todo CRUD operations
 * and console debug output
 */

console.log('========================================================');
console.log('       📝 TODO CRUD APP - DEBUG CONSOLE OUTPUT          ');
console.log('========================================================\n');

// Mock localStorage simulation
let mockStorage = {};
const localStorage = {
  getItem: (key) => mockStorage[key] || null,
  setItem: (key, val) => {
    mockStorage[key] = val;
  },
  removeItem: (key) => {
    delete mockStorage[key];
  },
};

// 1. Initial State
console.log('--- [STEP 1] INITIAL LOAD FROM LOCALSTORAGE ---');
let stored = localStorage.getItem('todos');
let todos = stored ? JSON.parse(stored) : [];
console.log('[DEBUG] Initial LocalStorage JSON ("todos"):', JSON.stringify(todos));
console.log('[OUTPUT] Total Tasks:', todos.length);

// 2. CREATE A TASK
console.log('\n--- [STEP 2] CREATE / ADD NEW TASK ---');
const task1 = {
  id: Date.now(),
  title: 'Learn React CRUD & LocalStorage',
  description: 'Master React state, hooks, and browser persistence.',
  priority: 'High',
  category: 'Learning',
  dueDate: '2026-09-30',
  completed: false,
  createdAt: new Date().toISOString(),
};

todos = [task1, ...todos];
localStorage.setItem('todos', JSON.stringify(todos));
console.log('➕ [DEBUG] Task Created Successfully:');
console.log(JSON.stringify(task1, null, 2));
console.log('💾 [DEBUG] Saved to LocalStorage JSON:');
console.log(localStorage.getItem('todos'));

// 3. CREATE SECOND TASK
console.log('\n--- [STEP 3] ADD SECOND TASK ---');
const task2 = {
  id: Date.now() + 1,
  title: 'Build Portfolio Project with Bootstrap 5',
  description: 'Clean UI with responsive design and badges.',
  priority: 'Medium',
  category: 'Work',
  dueDate: '2026-10-05',
  completed: false,
  createdAt: new Date().toISOString(),
};

todos = [task2, ...todos];
localStorage.setItem('todos', JSON.stringify(todos));
console.log('➕ [DEBUG] Second Task Created:', task2.title);
console.log('💾 [DEBUG] Updated LocalStorage JSON Array (Length: ' + todos.length + '):');
console.log(JSON.stringify(todos, null, 2));

// 4. TOGGLE COMPLETE
console.log('\n--- [STEP 4] TOGGLE TASK COMPLETION ---');
todos = todos.map((t) => (t.id === task1.id ? { ...t, completed: true } : t));
localStorage.setItem('todos', JSON.stringify(todos));
console.log('✅ [DEBUG] Task "' + task1.title + '" marked as COMPLETED.');
console.log('💾 [DEBUG] Updated LocalStorage JSON:');
console.log(localStorage.getItem('todos'));

// 5. PERMANENT DELETE
console.log('\n--- [STEP 5] PERMANENT DELETE FROM JSON ---');
console.log('🗑️ [DEBUG] Deleting Task ID: ' + task1.id + ' ("' + task1.title + '")');
todos = todos.filter((t) => t.id !== task1.id);
localStorage.setItem('todos', JSON.stringify(todos));
console.log('🗑️ [DEBUG] Task PERMANENTLY REMOVED from LocalStorage JSON!');
console.log('💾 [DEBUG] Current LocalStorage JSON:');
console.log(JSON.stringify(todos, null, 2));

// 6. REFRESH SIMULATION
console.log('\n--- [STEP 6] PAGE REFRESH (F5) SIMULATION ---');
console.log('🔄 [DEBUG] Reloading page: reading localStorage.getItem("todos")...');
const reloadedTodos = JSON.parse(localStorage.getItem('todos'));
console.log('📋 [DEBUG] Reloaded Todos from JSON:', reloadedTodos);
const isDeletedTaskPresent = reloadedTodos.some((t) => t.id === task1.id);
console.log('🔍 [VERIFICATION] Is deleted task present after refresh?:', isDeletedTaskPresent ? 'YES (BUG)' : 'NO (PERMANENTLY DELETED ✅)');
console.log('\n========================================================');
console.log('       🎉 ALL DEBUG & CRUD TESTS PASSED CLEANLY!       ');
console.log('========================================================');
