//
//  ViewAllMessagesViewController.m
//  Rainbros
//
//  Created by Victoria Kwong on 5/20/14.
//  Copyright (c) 2014 Victoria. All rights reserved.
//

#import "ViewAllMessagesViewController.h"
#import "ViewMessageViewController.h"

@interface ViewAllMessagesViewController ()
@property NSArray *messagesArray;
@end

@implementation ViewAllMessagesViewController

- (id)initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
    self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
    if (self) {
        // Custom initialization
    }
    return self;
}

- (void)viewDidLoad
{
    [super viewDidLoad];
    // Do any additional setup after loading the view.
    
//    [self.navigationController popViewControllerAnimated:YES];
    NSString *getMessagesURL = [[NSString alloc]initWithFormat:@"%@%@", @"http://www.stanford.edu/~vkwong/cgi-bin/Rainbros/getMessages.php?username=", self.userName];
    
    NSLog(@"%@", getMessagesURL);
    
    NSURLRequest *request = [NSURLRequest requestWithURL:[NSURL URLWithString:getMessagesURL]];
    
    NSURLResponse *response = (NSURLResponse *)request;
    
    NSError *e;
    NSData *data = [NSURLConnection sendSynchronousRequest:request returningResponse:&response error:&e];
    self.messagesArray = [[NSArray alloc] init];
    self.messagesArray = [NSJSONSerialization JSONObjectWithData:data options:NSJSONReadingAllowFragments error:&e];
    
    NSLog(@"%@", self.messagesArray);
    
    UITableView *tableView = (UITableView *)[self.view viewWithTag:1];
    [tableView reloadData];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfSectionsInTableView:(UITableView *)tableView
{
    return 1;
}

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
    return [self.messagesArray count];
}

- (UITableViewCell *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
    UITableViewCell *cell = [tableView dequeueReusableCellWithIdentifier:@"Message Cell"];
    NSDictionary *message = self.messagesArray[indexPath.row];
    cell.textLabel.text = message[@"sender"];
    return cell;
}



#pragma mark - Navigation

// In a storyboard-based application, you will often want to do a little preparation before navigation
- (void)prepareForSegue:(UIStoryboardSegue *)segue sender:(id)sender
{
    // Get the new view controller using [segue destinationViewController].
    // Pass the selected object to the new view controller.
    if ([sender isKindOfClass:[UITableViewCell class]]) {
        // find out which row in which section we're seguing from
        UITableView *tableView = (UITableView *)[self.view viewWithTag:1];
        NSIndexPath *indexPath = [tableView indexPathForCell:sender];
        if (indexPath) {
            if ([segue.identifier isEqualToString:@"viewOneMessage"]) {
                if ([segue.destinationViewController isKindOfClass:[ViewMessageViewController class]]) {
                    ViewMessageViewController *dest = (ViewMessageViewController *)segue.destinationViewController;
                    NSDictionary *message = self.messagesArray[indexPath.row];
                    dest.message = message[@"message"];;
                    dest.color = message[@"color"];
                }
            }
        }
    }
}


@end
