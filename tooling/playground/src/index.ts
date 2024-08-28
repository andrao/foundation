import { createClient } from '@supabase/supabase-js';
import chalk from 'chalk';

/**
 * Do something
 */
void (async function () {
    console.log(chalk.green('Hello, world!'));

    const supabase = createClient(
        `https://gnptoajvdfcoblliqavn.supabase.co`,
        `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImducHRvYWp2ZGZjb2JsbGlxYXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ4MDc5NDUsImV4cCI6MjA0MDM4Mzk0NX0.2W0LVQONlOFibkQTorK8Z8WsKDcE_P8ZZjqFsd78of8`,
    );

    const { data, error } = await supabase.schema('public').from('sample').select('*');

    console.log({ data, error });

    // Listen to inserts
    const sub = supabase
        .channel('todos')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sample' }, payload => {
            console.log('Change received!', payload);
        })
        .subscribe();

    //
})();
